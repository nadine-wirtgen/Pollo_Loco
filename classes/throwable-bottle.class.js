class ThrowableObject extends MovableObject{
  IMAGES_ROTATION = [
    'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  /**
   * Initializes a new throwable bottle at the specified position
   * @param {number} x - The x-coordinate to spawn the bottle
   * @param {number} y - The y-coordinate to spawn the bottle
   */
  constructor(x, y){
    super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw(x, y);
  }

  /**
   * Initiates the bottle throw with upward velocity and starts animations
   */
  throw(){
    this.speedY = 30;
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the bottle's movement and rotation animation loops
   */
  animate(){
    setInterval(() => this.handleMovement(), 25);
    setInterval(() => this.handleAnimation(), 60);
  }

  /**
   * Moves the bottle horizontally based on throw direction
   */
  handleMovement(){
    if(this.otherDirection){
      this.x -= 10;
    } else {
      this.x += 10;
    }
  }

  /**
   * Plays the bottle rotation animation
   */
  handleAnimation(){
    this.playAnimation(this.IMAGES_ROTATION);
  }
}