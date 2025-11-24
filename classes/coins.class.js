class Coin extends CollectableItem {
  constructor() {
    super('../assets/img/8_coin/coin_1.png', 500 + Math.random() * 900, 100 + Math.random() * 150, 50, 50);
  }
}