class MovableObject{
  x = 120;
  y = 250;
  img;
  height = 120;
  width = 60;
  
  loadImage(path){
    this.img = new Image();
    this.img.src = path;
  }

  moveRight(){
    console.log("move right");
  }
  
  moveLeft(){

  }
}