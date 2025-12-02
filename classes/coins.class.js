class Coin extends CollectableItem {
  IMAGES_COIN = [
    'assets/img/8_coin/coin_1.png',
    'assets/img/8_coin/coin_2.png'
  ];

  constructor() {
    super('assets/img/8_coin/coin_1.png', 500 + Math.random() * 900, 100 + Math.random() * 150, 100, 100);
    this.loadImages(this.IMAGES_COIN);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    },300);
  }
}