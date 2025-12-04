class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  level_end_x = 3600;
  /**
   * Initializes a game level with all its objects
   * @param {Array} enemies - Array of enemy objects
   * @param {Array} clouds - Array of cloud objects
   * @param {Array} backgroundObjects - Array of background objects
   * @param {Array} bottles - Array of collectible bottle objects
   * @param {Array} coins - Array of collectible coin objects
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  } 
}