class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  level_end_x = 1400;
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  } 
}