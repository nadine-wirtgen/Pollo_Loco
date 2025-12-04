/**
 * Initializes and returns the first game level with all enemies, objects, and collectibles
 * @returns {Level} The initialized level 1
 */
function initLevel1() {
  return new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Boss()
    ],
    [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud()
    ],
    [
      new BackgroundObject('assets/img/5_background/layers/air.png', -720),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -720),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -720),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -720),
      new BackgroundObject('assets/img/5_background/layers/air.png', 0),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),
      new BackgroundObject('assets/img/5_background/layers/air.png', 720),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720),
      new BackgroundObject('assets/img/5_background/layers/air.png', 1440),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 1440),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 1440),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 1440),
      new BackgroundObject('assets/img/5_background/layers/air.png', 2160),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 2160),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 2160),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 2160),
      new BackgroundObject('assets/img/5_background/layers/air.png', 2880),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 2880),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 2880),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 2880),
      new BackgroundObject('assets/img/5_background/layers/air.png', 3600),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 3600),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 3600),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 3600)
    ],
    [
      new BottleGround(),
      new BottleGround(),
      new BottleGround(),
      new BottleGround(),
      new BottleGround()
    ],
    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin()
    ]
  );
}