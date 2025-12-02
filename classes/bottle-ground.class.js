class BottleGround extends CollectableItem {
  IMAGES = [
    'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  constructor() {
    let randomImage = ['assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'][Math.floor(Math.random() * 2)];
    super(randomImage, 500 + Math.random() * 900, 350, 70, 80);
  }
}