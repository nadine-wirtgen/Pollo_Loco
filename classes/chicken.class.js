class Chicken extends MovableObject {
  height = 50;
  width = 50;
  y = 370;
  IMAGES_WALKING = [
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ]

  constructor(){
    super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = 250 + Math.random() * 500; // Zufällige x-Position zwischen 200 und 700
    this.speed = 0.15 + Math.random() * 0.5; // Zufällige Geschwindigkeit zwischen 0.15 und 0.4  
    this.animate();
  }

  animate(){
    setInterval(() => {  
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 10);
  }
}