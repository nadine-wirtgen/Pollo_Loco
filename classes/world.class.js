class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new HealthBar();
  bottleBar = new BottleBar();
  coinsBar = new CoinsBar();
  throwableObjects = [];
  bottleCount = 0;
  coinCount = 0;
  lastThrow = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
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

    this.ctx.translate(-this.camera_x, 0);
    // --------- Space for fixed objects -----------
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinsBar);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(() => self.draw());
    
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkBottleCollisions();
      this.checkBottleCollection();
      this.checkCoinCollection();
    }, 1000 / 60);
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
        // Check if character is jumping on chicken from above
        // Character must be in air, falling, and coming from above
        if (enemy instanceof Chicken && this.character.isAboveGround() && this.character.speedY < 0) {
          enemy.energy = 0;
          console.log('Jumped on chicken!');
        } else if (!this.character.isHurt()) {
          // Take damage when running into enemy or boss
          this.character.hit();
          this.healthBar.setPercentage(this.character.energy);
          console.log('Collision with enemy detected!', this.character.energy);
        }
      }
    });
  }

  checkBottleCollisions(){
    this.throwableObjects.forEach((bottle) => {
      bottle.getReaLFrame();
      this.level.enemies.forEach((enemy) => {
        enemy.getReaLFrame();
        if (bottle.isColliding(enemy) && !enemy.isDead()) {
          enemy.energy = 0;
          console.log('Bottle hit enemy!');
        }
      });
    });
  }

  checkBottleCollection(){
    if(this.bottleCount >= 5) return;
    this.character.getReaLFrame();
    this.level.bottles.forEach((bottle, index) => {
      bottle.getReaLFrame();
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(index, 1);
        this.bottleCount++;
        this.bottleBar.setPercentage(this.bottleCount * 20);
        console.log('Bottle collected! Total:', this.bottleCount);
      }
    });
  }

  checkCoinCollection(){
    if(this.coinCount >= 5) return;
    this.character.getReaLFrame();
    this.level.coins.forEach((coin, index) => {
      coin.getReaLFrame();
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        this.coinCount++;
        this.coinsBar.setPercentage(this.coinCount * 20);
        console.log('Coin collected! Total:', this.coinCount);
      }
    });
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
