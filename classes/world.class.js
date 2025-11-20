class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.draw();
      this.setWorld();
      this.draw();
    }
  

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(() => self.draw());
    
  }

  setWorld() {
    this.character.world = this;
  }
  

  addObjectsToMap(objects){
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

  addToMap(movableImage) {
    if (movableImage.otherDirection) {
      this.ctx.save();
      this.ctx.translate(movableImage.x + movableImage.width / 2, 0);
      this.ctx.scale(-1, 1);
      this.ctx.translate(-(movableImage.x + movableImage.width / 2), 0);
    }

    this.ctx.drawImage(movableImage.img, movableImage.x, movableImage.y, movableImage.width, movableImage.height);
    /*
    KASTEN ANZEIGEN LASSEN WEITER MACHEN!!! 08.refactoring
    this.ctx.beginPath();
    this.ctx.rect(movableImage.x, movableImage.y, movableImage.width, movableImage.height);
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
    */

    if (movableImage.otherDirection) {
      this.ctx.restore();
    }
  }
} 
