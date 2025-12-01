class World {
  character = new Character();
  level = initLevel1();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new HealthBar();
  bottleBar = new BottleBar();
  coinsBar = new CoinsBar();
  bossBar = new BossBar();
  showBossBar = false;
  throwableObjects = [];
  bottleCount = 0;
  coinCount = 0;
  lastThrow = 0;
  gameOverTime = null;
  youWinTime = null;
  gameWon = false;
  runInterval = null;
  animationFrameId = null;
  stopped = false;
  soundManager;

  constructor(canvas, keyboard, soundManager) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundManager = soundManager;
    this.bottleBar.setPercentage(0);
    this.coinsBar.setPercentage(0);
    this.draw();
    this.setWorld();
    this.run();
  }
  

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    // --------- Space for fixed objects -----------
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinsBar);
    if(this.showBossBar){
      this.addToMap(this.bossBar);
    }
    this.ctx.translate(this.camera_x, 0);
   
    this.ctx.translate(-this.camera_x, 0);
    
    // Show game over or win screen after 1 second delay
    if(this.character.isDead()){
      if(this.gameOverTime === null){
        this.gameOverTime = Date.now();
      }
      if(Date.now() - this.gameOverTime > 1000){
        document.getElementById('gameOverScreen').style.display = 'flex';
      }
    }
    
    let boss = this.level.enemies.find(e => e instanceof Boss);
    if(boss && boss.isDead()){
      if(this.youWinTime === null){
        this.youWinTime = Date.now();
        this.gameWon = true;
      }
      if(Date.now() - this.youWinTime > 1000){
        document.getElementById('youWinScreen').style.display = 'flex';
      }
    }
    
    let self = this;
    if (!this.stopped) {
      this.animationFrameId = requestAnimationFrame(() => self.draw());
    }
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.runInterval = setInterval(() => {
      // Stop all game logic when game is over
      let boss = this.level.enemies.find(e => e instanceof Boss);
      let gameOver = this.character.isDead() && this.gameOverTime && (Date.now() - this.gameOverTime > 1000);
      let gameWon = boss && boss.isDead() && this.youWinTime && (Date.now() - this.youWinTime > 1000);
      
      if(gameOver || gameWon) return;
      
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkBottleCollisions();
      this.checkBottleCollection();
      this.checkCoinCollection();
      this.updateBoss();
    }, 1000 / 60);
  }

  stop() {
    this.stopped = true;
    if (this.runInterval) {
      clearInterval(this.runInterval);
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  checkThrowObjects(){
    if(this.keyboard.D && !this.character.isDead() && this.bottleCount > 0 && (Date.now() - this.lastThrow) > 500){
      let offsetX = this.character.otherDirection ? -30 : 60;
      let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 50);
      bottle.otherDirection = this.character.otherDirection;
      this.throwableObjects.push(bottle);
      this.bottleCount--;
      this.bottleBar.setPercentage(this.bottleCount * 20);
      this.lastThrow = Date.now();
      console.log('Bottle thrown! Remaining:', this.bottleCount);
    }
  }

  checkCollisions(){
    this.character.getReaLFrame();
    this.level.enemies.forEach((enemy) => {
      enemy.getReaLFrame();
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        if (enemy instanceof Chicken && this.character.isAboveGround() && this.character.speedY < 0) {
          enemy.energy = 0;
          console.log('Jumped on chicken!');
        } else if (enemy instanceof Chicken && !this.character.isHurt()) {
          this.character.hit(5);
          this.healthBar.setPercentage(this.character.energy);
          console.log('Collision with chicken detected!', this.character.energy);
        } else if (enemy instanceof Boss && !this.character.isHurt()) {
          this.character.hit(20);
          this.healthBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkBottleCollisions(){
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      bottle.getReaLFrame();
      this.level.enemies.forEach((enemy) => {
        enemy.getReaLFrame();
        if (bottle.isColliding(enemy) && !enemy.isDead()) {
          if(enemy instanceof Boss){
            enemy.hit(20);
            this.bossBar.setPercentage(enemy.energy);
            console.log('Bottle hit boss! Boss energy:', enemy.energy);
          } else {
            enemy.energy = 0;
            console.log('Bottle hit enemy!');
          }
          this.throwableObjects.splice(bottleIndex, 1);
        }
      });
    });
  }

  checkBottleCollection(){
    if(this.bottleCount >= 5) return;
    this.checkCollectionFor(this.level.bottles, (index) => {
      this.level.bottles.splice(index, 1);
      this.bottleCount++;
      this.bottleBar.setPercentage(this.bottleCount * 20);
      this.level.bottles.push(new BottleGround()); // Respawn
      console.log('Bottle collected! Total:', this.bottleCount);
    });
  }

  checkCoinCollection(){
    if(this.coinCount >= 5) return;
    this.checkCollectionFor(this.level.coins, (index) => {
      this.level.coins.splice(index, 1);
      this.coinCount++;
      this.coinsBar.setPercentage(this.coinCount * 20);
      console.log('Coin collected! Total:', this.coinCount);
    });
  }

  checkCollectionFor(items, onCollect){
    this.character.getReaLFrame();
    items.forEach((item, index) => {
      item.getReaLFrame();
      if (this.character.isColliding(item)) {
        onCollect(index);
      }
    });
  }

  updateBoss(){
    let boss = this.level.enemies.find(e => e instanceof Boss);
    if(!boss) return;
    
    if(this.character.isDead()){
      boss.bossState = 'idle';
      return;
    }
    
    if(boss.isDead()) return; // Stop all boss actions when dead
    
    let distance = Math.abs(this.character.x - boss.x);
    
    // Character in view range (within 720px)
    if(distance < 720 && !boss.hadFirstContact){
      boss.bossState = 'alert';
      boss.hadFirstContact = true;
      setTimeout(() => {
        boss.bossState = 'walking';
        this.showBossBar = true;
      }, 3200);
    }
    
    // Boss walks towards character
    if(boss.bossState === 'walking'){
      // Stop 120px before character when coming from left, closer when from right
      let attackDistance = boss.x < this.character.x ? 120 : 20;
      
      if(distance > attackDistance){
        if(this.character.x < boss.x){
          boss.x -= boss.speed;
          boss.otherDirection = false;
        } else {
          boss.x += boss.speed;
          boss.otherDirection = true;
        }
      }
      
      // Boss close enough to attack
      if(distance <= attackDistance && !this.character.isDead()){
        boss.bossState = 'attacking';
        boss.currentImageIndex = 0;
        setTimeout(() => {
          if(this.character.isDead()) return; // Stop if character died during attack
          // Check distance at end of attack animation
          let endDistance = Math.abs(this.character.x - boss.x);
          if(endDistance <= attackDistance && !this.character.isHurt() && !this.character.isDead()){
            this.character.energy -= 20;
            if(this.character.energy < 0) this.character.energy = 0;
            this.healthBar.setPercentage(this.character.energy);
            this.character.lastHit = Date.now();
            console.log('Boss attacked! Character energy:', this.character.energy);
          }
          if(!this.character.isDead()){
            boss.bossState = 'walking';
          }
        }, 1200); 
      }
    }
  }

  addObjectsToMap(objects){
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

  addToMap(movableImage) {
    if (movableImage.otherDirection) {
      this.flipImage(movableImage);
    }

    movableImage.draw(this.ctx);
    movableImage.drawFrame(this.ctx);

    if (movableImage.otherDirection) {
      this.flipImageBack(movableImage);
    }
  }

  flipImage(movableImage) {
    this.ctx.save();
    this.ctx.translate(movableImage.x + movableImage.width / 2, 0);
    this.ctx.scale(-1, 1);
    this.ctx.translate(-(movableImage.x + movableImage.width / 2), 0);
  }

  flipImageBack() {
    this.ctx.restore();
  }
} 
