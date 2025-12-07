class BottleGround extends CollectableItem {
  IMAGES = [
    'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];
  offset = {
    top: 0,
    bottom: 0,
    left: 25,
    right: 10
  };

  /**
   * Initializes a bottle on the ground at a random position with a random image
   */
  constructor() {
    let randomImage = ['assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'][Math.floor(Math.random() * 2)];
    super(randomImage, 500 + Math.random() * 3000, 350, 70, 80);
  }
}