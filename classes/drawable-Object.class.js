class DrawableObject{
  x = 120;
  y = 300;
  img;
  height = 120;
  width = 60;
  imageCache = {};
  currentImageIndex = 0;

  
  /**
   * Loads a single image from the specified path
   * @param {string} path - Path to the image file
   */
  loadImage(path){
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object's image on the canvas
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  draw(ctx){
    if(this.img)
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  /**
   * Draws a debug frame around the object (for Character and Chicken only)
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  drawFrame(ctx){
    if(this instanceof Character || this instanceof Chicken){ 
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'red';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Loads multiple images and caches them
   * @param {Array<string>} arr - Array of image paths to load
   */
  loadImages(arr){
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}

