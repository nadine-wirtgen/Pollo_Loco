class MovableObject{
  x = 120;
  y = 300;
  img;
  height = 120;
  width = 60;
  imageCache = {};
  currentImageIndex = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  applyGravity(){
    const groundY = 226;
    setInterval(() => {
      this.speedY -= this.acceleration;
      this.y -= this.speedY;
      if (this.y > groundY) {
        this.y = groundY;
        this.speedY = 0;
      }
    }, 1000 / 60);
  }

  isAboveGround(){
    return this.y < 226;
  }

  loadImage(path){
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr){
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images){
    let i = this.currentImageIndex % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImageIndex++;
  }
  moveRight(){
    this.x += this.speed;
  }
  
  moveLeft(){
      this.x -= this.speed;
  }

  jump(){
    this.speedY = 30;
  }
}