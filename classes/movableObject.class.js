class MovableObject extends DrawableObject{
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  offset = { top: 0, bottom: 0, left: 0, right: 0 };
  energy = 100;
  lastHit = 0;

  applyGravity(){
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  isAboveGround(){
    if(this instanceof ThrowableObject){
      return true;
    } else {
      return this.y < 226;      
    }
  }

  getReaLFrame(){
    this.realX = this.x + this.offset.left;
    this.realY = this.y + this.offset.top;
    this.realWidth = this.width - this.offset.right - this.offset.left;
    this.realHeight = this.height - this.offset.top - this.offset.bottom;
  }

  isColliding(movableObject){
    return this.realX + this.realWidth > movableObject.realX &&
           this.realX < movableObject.realX + movableObject.realWidth &&
           this.realY + this.realHeight > movableObject.realY &&
           this.realY < movableObject.realY + movableObject.realHeight;
  }

  hit(){
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    }
    // record time of this hit (ms)
    this.lastHit = Date.now();
  }

  isHurt(){
    // time passed since last hit in seconds
    let timepassed = (Date.now() - this.lastHit) / 1000;
    return timepassed < 0.5;
  }

  isDead(){
    return this.energy == 0;
  }

  playAnimation(images){
    let i = this.currentImageIndex % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImageIndex++;
  }

  moveRight(){
    this.x += this.speed;
  }
  
  moveLeft(){
      this.x -= this.speed;
  }

  jump(){
    this.speedY = 30;
  }
}