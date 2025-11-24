class CollectableItem extends MovableObject {
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  };

  constructor(imagePath, x, y, width, height) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}