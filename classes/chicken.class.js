class Chicken extends MovableObject {
  height = 50;
  width = 50;
  y = 370;
  energy = 1;
  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  };
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ]
  IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

  /**
   * Initializes a new chicken enemy at a random position
   */
  constructor(){
    super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGE_DEAD);
    this.x = 500 + Math.random() * 3000;
    this.speed = 0.15 + Math.random() * 0.5; 
    this.animate();
  }

  /**
   * Starts the chicken's movement and animation loops
   */
  animate(){
    setInterval(() => this.handleMovement(), 1000 / 60);
    setInterval(() => this.handleAnimation(), 1000 / 10);
  }

  /**
   * Handles the chicken's movement (walks left if alive)
   */
  handleMovement(){
    if(!this.isDead()){
      this.moveLeft();
    }
  }

  /**
   * Handles the chicken's animation (dead or walking)
   */
  handleAnimation(){
    if(this.isDead()){
      this.loadImage(this.IMAGE_DEAD);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }
}