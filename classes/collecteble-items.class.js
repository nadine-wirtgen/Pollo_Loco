class CollectableItem extends MovableObject {
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  };

  /**
   * Initializes a collectable item
   * @param {string} imagePath - Path to the item's image
   * @param {number} x - The x-coordinate position
   * @param {number} y - The y-coordinate position
   * @param {number} width - The width of the item
   * @param {number} height - The height of the item
   */
  constructor(imagePath, x, y, width, height) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}