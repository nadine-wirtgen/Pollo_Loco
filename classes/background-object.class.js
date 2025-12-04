class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  /**
   * Initializes a background object at the specified position
   * @param {string} imagePath - Path to the background image
   * @param {number} x - The x-coordinate position
   */
  constructor(imagePath, x){
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}