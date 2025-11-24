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
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ]
  IMAGE_DEAD = '../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

  constructor(){
    super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGE_DEAD);
    this.x = 500 + Math.random() * 1200; // Zufällige x-Position zwischen 500 und 1700
    this.speed = 0.15 + Math.random() * 0.5; // Zufällige Geschwindigkeit zwischen 0.15 und 0.4  
    // No gravity for chickens - they walk on the ground
    this.animate();
  }

  animate(){
    setInterval(() => {  
      if(!this.isDead()){
        this.moveLeft();
      }
    }, 1000 / 60);
    setInterval(() => {
      if(this.isDead()){
        this.loadImage(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 10);
  }
}