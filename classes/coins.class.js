class Coin extends CollectableItem {
  IMAGES_COIN = [
    'assets/img/8_coin/coin_1.png',
    'assets/img/8_coin/coin_2.png'
  ];

  offset = {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30
  };

  /**
   * Initializes a new coin at a random position
   */
  constructor() {
    super('assets/img/8_coin/coin_1.png', 500 + Math.random() * 3000, 100 + Math.random() * 150, 100, 100);
    this.loadImages(this.IMAGES_COIN);
    this.animate();
  }

  /**
   * Starts the coin's animation loop
   */
  animate() {
    setInterval(() => this.handleAnimation(), 300);
  }

  /**
   * Plays the coin animation
   */
  handleAnimation() {
    this.playAnimation(this.IMAGES_COIN);
  }
}