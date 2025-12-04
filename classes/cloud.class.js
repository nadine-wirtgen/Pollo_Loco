class Cloud extends MovableObject {
  x = (Math.random() * 1200) - 200;
  y = 20 + Math.random() * 100;
  width = 400;
  height = 250;
  speed = 0.15;
  
  constructor(){
    super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
    this.animate();
  }

  animate(){
    setInterval(() => this.handleMovement(), 1000 / 60);
  }

  handleMovement(){
    this.moveLeft();
  }
}