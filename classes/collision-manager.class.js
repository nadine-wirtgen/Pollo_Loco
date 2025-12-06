class CollisionManager {
  world;

  /**
   * Initializes the collision manager with a reference to the game world
   * @param {World} world - The game world instance
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks for collisions between character and enemies
   * Stop collision checks when character is dead
   */
  checkCollisions(){
    if(this.world.character.isDead()) return;
    this.world.character.getReaLFrame();
    this.world.level.enemies.forEach((enemy) => {
      enemy.getReaLFrame();
      if (this.world.character.isColliding(enemy) && !enemy.isDead()) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  /**
   * Handles collision between character and an enemy
   * @param {MovableObject} enemy - The enemy that collided with the character
   * Boss damage is handled in updateBoss() during attack animation
   */
  handleEnemyCollision(enemy){
    if (this.isChicken(enemy) && this.isJumpingOnEnemy()) {
      this.killChickenByJump(enemy);
    } else if (this.isChicken(enemy) && !this.world.character.isHurt()) {
      this.damageCharacterByChicken();
    } 
  }

  /**
   * Checks if the enemy is a chicken type
   * @param {MovableObject} enemy - The enemy to check
   * @returns {boolean} True if enemy is a Chicken or SmallChicken
   */
  isChicken(enemy){
    return enemy instanceof Chicken || enemy instanceof SmallChicken;
  }

  /**
   * Checks if character is jumping on top of an enemy
   * @returns {boolean} True if character is in the air and falling down
   */
  isJumpingOnEnemy(){
    return this.world.character.isAboveGround() && this.world.character.speedY < 0;
  }

  /**
   * Kills a chicken enemy when jumped on
   * @param {MovableObject} enemy - The chicken to kill
   */
  killChickenByJump(enemy){
    enemy.energy = 0;
    this.world.soundManager.playChickenDeath();
  }

  /**
   * Applies damage to character when hit by a chicken
   */
  damageCharacterByChicken(){
    this.world.character.hit(10);
    this.world.healthBar.setPercentage(this.world.character.energy);
  }

  /**
   * Checks for collisions between thrown bottles and enemies
   */
  checkBottleCollisions(){
    this.world.throwableObjects.forEach((bottle, bottleIndex) => {
      bottle.getReaLFrame();
      this.world.level.enemies.forEach((enemy) => {
        enemy.getReaLFrame();
        if (bottle.isColliding(enemy) && !enemy.isDead()) {
          if(enemy instanceof Boss){
            enemy.hit(20);
            this.world.bossBar.setPercentage(enemy.energy);
            this.world.soundManager.playBossScream();
          } else {
            enemy.energy = 0;
          }
          this.world.throwableObjects.splice(bottleIndex, 1);
        }
      });
    });
  }

  /**
   * Checks if character collects a bottle from the ground
   */
  checkBottleCollection(){
    if(this.world.bottleCount >= 5) return;
    this.checkCollectionFor(this.world.level.bottles, (index) => {
      this.world.level.bottles.splice(index, 1);
      this.world.bottleCount++;
      this.world.bottleBar.setPercentage(this.world.bottleCount * 20);
      this.world.level.bottles.push(new BottleGround());
      this.world.soundManager.playBottleCollect();
    });
  }

  /**
   * Checks if character collects a coin
   */
  checkCoinCollection(){
    this.checkCollectionFor(this.world.level.coins, (index) => {
      this.world.level.coins.splice(index, 1);
      this.world.coinCount++;
      const percentage = Math.round((this.world.coinCount / this.world.totalCoins) * 100);
      this.world.coinsBar.setPercentage(percentage);
      this.world.soundManager.playCoin();
    });
  }

  /**
   * Generic method to check character collision with collectible items
   * @param {Array} items - Array of collectible items to check
   * @param {Function} onCollect - Callback function when item is collected
   */
  checkCollectionFor(items, onCollect){
    this.world.character.getReaLFrame();
    items.forEach((item, index) => {
      item.getReaLFrame();
      if (this.world.character.isColliding(item)) {
        onCollect(index);
      }
    });
  }

  /**
   * Applies damage to character when hit by boss attack
   */
  damageCharacterByBoss(){
    this.world.character.energy -= 20;
    if(this.world.character.energy < 0) this.world.character.energy = 0;
    this.world.healthBar.setPercentage(this.world.character.energy);
    this.world.character.lastHit = Date.now();
    this.world.soundManager.playHit();
  }
}
