class ThrowableObject extends MovableObject{
  IMAGES_ROTATION = [
    'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  constructor(x, y){
    super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw(x, y);
  }

  throw(){
    this.speedY = 30;
    this.applyGravity();
    this.animate();
  }

  animate(){
    setInterval(() => this.handleMovement(), 25);
    setInterval(() => this.handleAnimation(), 60);
  }

  handleMovement(){
    if(this.otherDirection){
      this.x -= 10;
    } else {
      this.x += 10;
    }
  }

  handleAnimation(){
    this.playAnimation(this.IMAGES_ROTATION);
  }
}