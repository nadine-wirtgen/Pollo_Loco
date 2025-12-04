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
  totalCoins = 0;
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
    this.totalCoins = this.level.coins.length;
    this.bottleBar.setPercentage(0);
    this.coinsBar.setPercentage(0);
    this.draw();
    this.setWorld();
    this.run();
  }
  

  draw() {
    this.clearCanvas();
    this.drawGameWorld();
    this.drawFixedObjects();
    this.handleGameScreens();
    this.requestNextFrame();
  }

  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGameWorld(){
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  drawFixedObjects(){
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinsBar);
    if(this.showBossBar){
      this.addToMap(this.bossBar);
    }
  }

  handleGameScreens(){
    if(this.character.isDead()){
      this.showGameOverScreen();
    }
    
    let boss = this.level.enemies.find(e => e instanceof Boss);
    if(boss && boss.isDead()){
      this.showYouWinScreen();
    }
  }

  showGameOverScreen(){
    if(this.gameOverTime === null){
      this.gameOverTime = Date.now();
    }
    if(Date.now() - this.gameOverTime > 1000){
      document.getElementById('gameOverScreen').style.display = 'flex';
    }
  }

  showYouWinScreen(){
    if(this.youWinTime === null){
      this.youWinTime = Date.now();
      this.gameWon = true;
    }
    if(Date.now() - this.youWinTime > 1000){
      document.getElementById('youWinScreen').style.display = 'flex';
    }
  }

  requestNextFrame(){
    if (!this.stopped) {
      this.animationFrameId = requestAnimationFrame(() => this.draw());
    }
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.runInterval = setInterval(() => this.runGameLoop(), 1000 / 60);
  }

  runGameLoop(){
    if(this.isGameFinished()) return;
    this.checkCollisions();
    this.checkThrowObjects();
    this.checkBottleCollisions();
    this.checkBottleCollection();
    this.checkCoinCollection();
    this.updateBoss();
  }

  isGameFinished(){
    let boss = this.level.enemies.find(e => e instanceof Boss);
    let gameOver = this.character.isDead() && this.gameOverTime && (Date.now() - this.gameOverTime > 1000);
    let gameWon = boss && boss.isDead() && this.youWinTime && (Date.now() - this.youWinTime > 1000);
    return gameOver || gameWon;
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
    if(this.character.isDead()) return; // Stop collision checks when character is dead
    this.character.getReaLFrame();
    this.level.enemies.forEach((enemy) => {
      enemy.getReaLFrame();
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  handleEnemyCollision(enemy){
    if (this.isChicken(enemy) && this.isJumpingOnEnemy()) {
      this.killChickenByJump(enemy);
    } else if (this.isChicken(enemy) && !this.character.isHurt()) {
      this.damageCharacterByChicken();
    }
    // Boss damage is handled in updateBoss() during attack animation
  }

  isChicken(enemy){
    return enemy instanceof Chicken || enemy instanceof SmallChicken;
  }

  isJumpingOnEnemy(){
    return this.character.isAboveGround() && this.character.speedY < 0;
  }

  killChickenByJump(enemy){
    enemy.energy = 0;
    this.soundManager.playChickenDeath();
    console.log('Jumped on chicken!');
  }

  damageCharacterByChicken(){
    this.character.hit(10);
    this.healthBar.setPercentage(this.character.energy);
    console.log('Collision with chicken detected!', this.character.energy);
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
            this.soundManager.playBossScream();
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
      this.soundManager.playBottleCollect();
      console.log('Bottle collected! Total:', this.bottleCount);
    });
  }

  checkCoinCollection(){
    this.checkCollectionFor(this.level.coins, (index) => {
      this.level.coins.splice(index, 1);
      this.coinCount++;
      const percentage = Math.round((this.coinCount / this.totalCoins) * 100);
      this.coinsBar.setPercentage(percentage);
      this.soundManager.playCoin();
      console.log('Coin collected! Total:', this.coinCount, '/', this.totalCoins, '-', percentage + '%');
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
    if(!boss || boss.isDead()) return;
    
    if(this.character.isDead()){
      boss.bossState = 'idle';
      return;
    }
    
    let distance = Math.abs(this.character.x - boss.x);
    this.handleBossFirstContact(boss, distance);
    this.handleBossWalking(boss, distance);
  }

  handleBossFirstContact(boss, distance){
    if(distance < 500 && !boss.hadFirstContact){
      boss.bossState = 'alert';
      boss.hadFirstContact = true;
      this.playBossScreamDelayed();
      this.startBossWalkingDelayed(boss);
    }
  }

  playBossScreamDelayed(){
    setTimeout(() => {
      this.soundManager.playBossScream();
    }, 2000);
  }

  startBossWalkingDelayed(boss){
    setTimeout(() => {
      boss.bossState = 'walking';
      this.showBossBar = true;
    }, 3200);
  }

  handleBossWalking(boss, distance){
    if(boss.bossState !== 'walking') return;
    
    let attackDistance = boss.x < this.character.x ? 120 : 40;
    
    if(distance > attackDistance){
      this.moveBossTowardsCharacter(boss);
    }
    
    if(distance <= attackDistance && !this.character.isDead()){
      this.startBossAttack(boss, attackDistance);
    }
  }

  moveBossTowardsCharacter(boss){
    if(this.character.x < boss.x){
      boss.x -= boss.speed;
      boss.otherDirection = false;
    } else {
      boss.x += boss.speed;
      boss.otherDirection = true;
    }
  }

  startBossAttack(boss, attackDistance){
    boss.bossState = 'attacking';
    boss.currentImageIndex = 0;
    setTimeout(() => {
      this.executeBossAttack(boss, attackDistance);
    }, 1050);
  }

  executeBossAttack(boss, attackDistance){
    if(this.character.isDead()) return;
    
    let endDistance = Math.abs(this.character.x - boss.x);
    if(endDistance <= attackDistance && !this.character.isHurt() && !this.character.isDead()){
      this.damageCharacterByBoss();
    }
    if(!this.character.isDead()){
      boss.bossState = 'walking';
    }
  }

  damageCharacterByBoss(){
    this.character.energy -= 20;
    if(this.character.energy < 0) this.character.energy = 0;
    this.healthBar.setPercentage(this.character.energy);
    this.character.lastHit = Date.now();
    this.soundManager.playHit();
    console.log('Boss attacked! Character energy:', this.character.energy);
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
