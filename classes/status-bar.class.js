class StatusBar extends DrawableObject{
  IMAGES = [];
  percentage = 100;

  /**
   * Initializes a status bar with the given images
   * @param {Array<string>} images - Array of image paths for different percentage levels
   * @param {number} y - The y-coordinate position (default: 10)
   */
  constructor(images, y = 10){
    super();
    this.IMAGES = images;
    this.x = 20;
    this.y = y;
    this.width = 160;
    this.height = 50;
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
  }

  /**
   * Sets the status bar to display the given percentage
   * @param {number} percentage - The percentage value to display (0-100)
   */
  setPercentage(percentage){
    this.percentage = percentage;
    let imagePath = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Resolves which image index to use based on current percentage
   * @returns {number} The index of the image to display
   */
  resolveImageIndex(){
    if(this.percentage == 100){
      return 5;
    } else if (this.percentage >= 80){
      return 4;
    } else if (this.percentage >= 60){
      return 3;
    } else if (this.percentage >= 40){
      return 2;
    } else if (this.percentage >= 20){
      return 1;
    } else {
      return 0;
    }
  }
}