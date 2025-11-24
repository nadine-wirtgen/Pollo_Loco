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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
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

    
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
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
    }, 80);
  }

  checkThrowObjects(){
    if(this.keyboard.D){
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      bottle.otherDirection = this.character.otherDirection;
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions(){
    this.character.getReaLFrame();
    this.level.enemies.forEach((enemy) => {
      enemy.getReaLFrame();
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
        console.log('Collision with enemy detected!', this.character.energy);
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

  flipImageBack(movableImage) {
    this.ctx.restore();
  }
} 
