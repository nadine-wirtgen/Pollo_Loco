class ThrowableObject extends MovableObject{
  IMAGES_ROTATION = [
    'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];
  IMAGES_SPLASH = [
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
  ];
  isSplashing = false;
  splashAnimationFinished = false;
  animationInterval = null;

  /**
   * Initializes a new throwable bottle at the specified position
   * @param {number} x - The x-coordinate to spawn the bottle
   * @param {number} y - The y-coordinate to spawn the bottle
   */
  constructor(x, y){
    super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
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
    this.animationInterval = setInterval(() => this.handleAnimation(), 60);
  }

  /**
   * Moves the bottle horizontally based on throw direction
   */
  handleMovement(){
    if(this.isSplashing) return;
    if(this.otherDirection){
      this.x -= 10;
    } else {
      this.x += 10;
    }
  }

  /**
   * Plays the bottle rotation or splash animation
   */
  handleAnimation(){
    if(this.isSplashing){
      this.playSplashAnimation();
    } else {
      this.playAnimation(this.IMAGES_ROTATION);
    }
  }

  /**
   * Plays the splash animation once and marks it as finished
   */
  playSplashAnimation(){
    if(!this.splashAnimationFinished){
      let currentIndex = this.imageCache[this.IMAGES_SPLASH[0]] ? 
        this.IMAGES_SPLASH.findIndex(img => this.img.src.includes(img)) : -1;
      
      if(currentIndex < this.IMAGES_SPLASH.length - 1){
        this.playAnimation(this.IMAGES_SPLASH);
      } else {
        this.splashAnimationFinished = true;
      }
    }
  }

  /**
   * Triggers the splash animation on impact
   */
  splash(){
    this.isSplashing = true;
    this.speedY = 0;
  }
}