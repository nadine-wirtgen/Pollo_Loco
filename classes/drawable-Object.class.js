class DrawableObject{
  x = 120;
  y = 300;
  img;
  height = 120;
  width = 60;
  imageCache = {};
  currentImageIndex = 0;

  
  loadImage(path){
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx){
  //Macht rote kasten drumherum
  if(this instanceof Character || this instanceof Chicken){  //kasten werden nur bei character und chicken gezeichnet
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'red';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
  //end
  }

  loadImages(arr){
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}

