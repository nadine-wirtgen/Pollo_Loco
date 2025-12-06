class MovableObject extends DrawableObject{
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  offset = { top: 0, bottom: 0, left: 0, right: 0 };
  energy = 100;
  lastHit = 0;

  /**
   * Applies gravity physics to the object
   */
  applyGravity(){
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  /**
   * Checks if the object is above ground level
   * @returns {boolean} True if object is above ground (except for throwable objects)
   */
  isAboveGround(){
    if(this instanceof ThrowableObject){
      return true;
    } else {
      return this.y < 226;      
    }
  }

  /**
   * Calculates the real collision frame considering offsets
   */
  getReaLFrame(){
    this.realX = this.x + this.offset.left;
    this.realY = this.y + this.offset.top;
    this.realWidth = this.width - this.offset.right - this.offset.left;
    this.realHeight = this.height - this.offset.top - this.offset.bottom;
  }

  /**
   * Checks if this object is colliding with another object
   * @param {MovableObject} movableObject - The object to check collision with
   * @returns {boolean} True if objects are colliding
   */
  isColliding(movableObject){
    return this.realX + this.realWidth > movableObject.realX &&
            this.realX < movableObject.realX + movableObject.realWidth &&
            this.realY + this.realHeight > movableObject.realY &&
            this.realY < movableObject.realY + movableObject.realHeight;
  }

  /**
   * Applies damage to the object and records hit time
   * @param {number} damage - Amount of damage to apply (default: 10)
   */
  hit(damage = 10){
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.lastHit = Date.now();
  }

  /**
   * Checks if the object is in hurt state
   * @returns {boolean} True if object was hit in the last 0.5 seconds
   */
  isHurt(){
    let timepassed = (Date.now() - this.lastHit) / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks if the object is dead
   * @returns {boolean} True if energy is zero or below
   */
  isDead(){
    return this.energy <= 0;
  }

  /**
   * Plays a looping animation from an array of images
   * @param {Array<string>} images - Array of image paths for the animation
   */
  playAnimation(images){
    let i = this.currentImageIndex % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImageIndex++;
  }

  /**
   * Plays an animation sequence once without looping
   * @param {Array<string>} images - Array of image paths for the animation
   * @returns {boolean} True if animation is finished, false otherwise
   */
  playAnimationOnce(images){
    if (this.currentImageIndex < images.length) {
      let path = images[this.currentImageIndex];
      this.img = this.imageCache[path];
      this.currentImageIndex++;
      return false;
    }
    return true;
  }

  /**
   * Moves the object to the right by its speed
   */
  moveRight(){
    this.x += this.speed;
  }
  
  /**
   * Moves the object to the left by its speed
   */
  moveLeft(){
      this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting upward vertical speed
   */
  jump(){
    this.speedY = 30;
  }
}