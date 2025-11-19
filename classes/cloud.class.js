class Cloud extends MovableObject {
  x = (Math.random() * 500) - 200;
  y = 20 + Math.random() * 100;
  width = 400;
  height = 250;
  constructor(){
    super().loadImage('../assets/img/5_background/layers/4_clouds/1.png');
    this.animate();
  }
  animate(){
    setInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);
  }
}