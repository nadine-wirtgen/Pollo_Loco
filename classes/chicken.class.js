class Chicken extends MovableObject {
  height = 50;
  width = 50;
  y = 370;
  constructor(){
    super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 250 + Math.random() * 500; // Zufällige x-Position zwischen 200 und 700
  }
}