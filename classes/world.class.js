class World {
  character = new Character();
  level = initLevel1();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new HealthBar();
  bottleBar = new BottleBar();
  coinsBar = new CoinsBar();
  bossBar = new BossBar();
  showBossBar = false;
  throwableObjects = [];
  bottleCount = 0;
  coinCount = 0;
  totalCoins = 0;
  lastThrow = 0;
  gameOverTime = null;
  youWinTime = null;
  gameWon = false;
  runInterval = null;
  animationFrameId = null;
  stopped = false;
  bossAlertActive = false;
  soundManager;

  /**
   * Initializes the game world with canvas, keyboard, and sound manager
   * @param {HTMLCanvasElement} canvas - The game canvas element
   * @param {Keyboard} keyboard - The keyboard input handler
   * @param {SoundManager} soundManager - The sound manager instance
   */
  constructor(canvas, keyboard, soundManager) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundManager = soundManager;
    this.totalCoins = this.level.coins.length;
    this.bottleBar.setPercentage(0);
    this.coinsBar.setPercentage(0);
    this.draw();
    this.setWorld();
    this.run();
  }
  

  /**
   * Main draw loop that renders all game objects to the canvas
   */
  draw() {
    this.clearCanvas();
    this.drawGameWorld();
    this.drawFixedObjects();
    this.handleGameScreens();
    this.requestNextFrame();
  }

  /**
   * Clears the entire canvas for the next frame
   */
  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws all game world objects with camera translation
   */
  drawGameWorld(){
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws fixed UI elements (status bars) that don't move with the camera
   */
  drawFixedObjects(){
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinsBar);
    if(this.showBossBar){
      this.addToMap(this.bossBar);
    }
  }

  /**
   * Manages game over and win screen displays
   */
  handleGameScreens(){
    if(this.character.isDead()){
      this.showGameOverScreen();
    }
    
    let boss = this.level.enemies.find(e => e instanceof Boss);
    if(boss && boss.isDead()){
      this.showYouWinScreen();
    }
  }

  /**
   * Shows the game over screen after a delay when character dies
   */
  showGameOverScreen(){
    if(this.gameOverTime === null){
      this.gameOverTime = Date.now();
    }
    if(Date.now() - this.gameOverTime > 1000){
      document.getElementById('gameOverScreen').style.display = 'flex';
      document.getElementById('backToMenuButton').style.display = 'none';
    }
  }

  /**
   * Shows the victory screen after a delay when boss is defeated
   */
  showYouWinScreen(){
    if(this.youWinTime === null){
      this.youWinTime = Date.now();
      this.gameWon = true;
    }
    if(Date.now() - this.youWinTime > 1000){
      document.getElementById('youWinScreen').style.display = 'flex';
      document.getElementById('backToMenuButton').style.display = 'none';
    }
  }

  /**
   * Requests the next animation frame if the game is not stopped
   */
  requestNextFrame(){
    if (!this.stopped) {
      this.animationFrameId = requestAnimationFrame(() => this.draw());
    }
  }

  /**
   * Sets the world reference in the character object
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main game loop interval
   */
  run() {
    this.runInterval = setInterval(() => this.runGameLoop(), 1000 / 60);
  }

  /**
   * Main game loop that checks collisions, throws, and updates
   */
  runGameLoop(){
    if(this.isGameFinished()) return;
    this.checkCollisions();
    this.checkThrowObjects();
    this.checkBottleCollisions();
    this.checkBottleCollection();
    this.checkCoinCollection();
    this.updateBoss();
  }

  /**
   * Checks if the game has ended (player dead or boss defeated)
   * @returns {boolean} True if game is over or won
   */
  isGameFinished(){
    let boss = this.level.enemies.find(e => e instanceof Boss);
    let gameOver = this.character.isDead() && this.gameOverTime && (Date.now() - this.gameOverTime > 1000);
    let gameWon = boss && boss.isDead() && this.youWinTime && (Date.now() - this.youWinTime > 1000);
    return gameOver || gameWon;
  }

  /**
   * Stops all game loops and animations
   */
  stop() {
    this.stopped = true;
    if (this.runInterval) {
      clearInterval(this.runInterval);
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  /**
   * Checks if player wants to throw a bottle and creates throwable object
   */
  checkThrowObjects(){
    if(this.keyboard.D && !this.character.isDead() && !this.bossAlertActive && this.bottleCount > 0 && (Date.now() - this.lastThrow) > 500){
      let offsetX = this.character.otherDirection ? -30 : 60;
      let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 50);
      bottle.otherDirection = this.character.otherDirection;
      this.throwableObjects.push(bottle);
      this.bottleCount--;
      this.bottleBar.setPercentage(this.bottleCount * 20);
      this.lastThrow = Date.now();
      console.log('Bottle thrown! Remaining:', this.bottleCount);
    }
  }

  /**
   * Checks for collisions between character and enemies
   */
  checkCollisions(){
    if(this.character.isDead()) return; // Stop collision checks when character is dead
    this.character.getReaLFrame();
    this.level.enemies.forEach((enemy) => {
      enemy.getReaLFrame();
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  /**
   * Handles collision between character and an enemy
   * @param {MovableObject} enemy - The enemy that collided with the character
   */
  handleEnemyCollision(enemy){
    if (this.isChicken(enemy) && this.isJumpingOnEnemy()) {
      this.killChickenByJump(enemy);
    } else if (this.isChicken(enemy) && !this.character.isHurt()) {
      this.damageCharacterByChicken();
    }
    // Boss damage is handled in updateBoss() during attack animation
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
    return this.character.isAboveGround() && this.character.speedY < 0;
  }

  /**
   * Kills a chicken enemy when jumped on
   * @param {MovableObject} enemy - The chicken to kill
   */
  killChickenByJump(enemy){
    enemy.energy = 0;
    this.soundManager.playChickenDeath();
    console.log('Jumped on chicken!');
  }

  /**
   * Applies damage to character when hit by a chicken
   */
  damageCharacterByChicken(){
    this.character.hit(10);
    this.healthBar.setPercentage(this.character.energy);
    console.log('Collision with chicken detected!', this.character.energy);
  }

  /**
   * Checks for collisions between thrown bottles and enemies
   */
  checkBottleCollisions(){
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      bottle.getReaLFrame();
      this.level.enemies.forEach((enemy) => {
        enemy.getReaLFrame();
        if (bottle.isColliding(enemy) && !enemy.isDead()) {
          if(enemy instanceof Boss){
            enemy.hit(20);
            this.bossBar.setPercentage(enemy.energy);
            this.soundManager.playBossScream();
            console.log('Bottle hit boss! Boss energy:', enemy.energy);
          } else {
            enemy.energy = 0;
            console.log('Bottle hit enemy!');
          }
          this.throwableObjects.splice(bottleIndex, 1);
        }
      });
    });
  }

  /**
   * Checks if character collects a bottle from the ground
   */
  checkBottleCollection(){
    if(this.bottleCount >= 5) return;
    this.checkCollectionFor(this.level.bottles, (index) => {
      this.level.bottles.splice(index, 1);
      this.bottleCount++;
      this.bottleBar.setPercentage(this.bottleCount * 20);
      this.level.bottles.push(new BottleGround()); // Respawn
      this.soundManager.playBottleCollect();
      console.log('Bottle collected! Total:', this.bottleCount);
    });
  }

  /**
   * Checks if character collects a coin
   */
  checkCoinCollection(){
    this.checkCollectionFor(this.level.coins, (index) => {
      this.level.coins.splice(index, 1);
      this.coinCount++;
      const percentage = Math.round((this.coinCount / this.totalCoins) * 100);
      this.coinsBar.setPercentage(percentage);
      this.soundManager.playCoin();
      console.log('Coin collected! Total:', this.coinCount, '/', this.totalCoins, '-', percentage + '%');
    });
  }

  /**
   * Generic method to check character collision with collectible items
   * @param {Array} items - Array of collectible items to check
   * @param {Function} onCollect - Callback function when item is collected
   */
  checkCollectionFor(items, onCollect){
    this.character.getReaLFrame();
    items.forEach((item, index) => {
      item.getReaLFrame();
      if (this.character.isColliding(item)) {
        onCollect(index);
      }
    });
  }

  /**
   * Updates boss behavior and AI
   */
  updateBoss(){
    let boss = this.level.enemies.find(e => e instanceof Boss);
    if(!boss || boss.isDead()) return;
    
    if(this.character.isDead()){
      boss.bossState = 'idle';
      return;
    }
    
    let distance = Math.abs(this.character.x - boss.x);
    this.handleBossFirstContact(boss, distance);
    this.handleBossWalking(boss, distance);
  }

  /**
   * Handles the first encounter with the boss
   * @param {Boss} boss - The boss enemy
   * @param {number} distance - Distance between character and boss
   */
  handleBossFirstContact(boss, distance){
    if(distance < 400 && !boss.hadFirstContact){
      boss.bossState = 'alert';
      boss.hadFirstContact = true;
      this.bossAlertActive = true;
      this.playBossScreamDelayed();
      this.startBossWalkingDelayed(boss);
    }
  }

  /**
   * Plays boss scream sound after a 2 second delay
   */
  playBossScreamDelayed(){
    setTimeout(() => {
      this.soundManager.playBossScream();
    }, 2200);
  }

  /**
   * Starts boss walking animation after a delay and shows boss health bar
   * @param {Boss} boss - The boss enemy
   */
  startBossWalkingDelayed(boss){
    setTimeout(() => {
      boss.bossState = 'walking';
      this.showBossBar = true;
      this.bossAlertActive = false;
    }, 3200);
  }

  /**
   * Handles boss movement and attack behavior during walking state
   * @param {Boss} boss - The boss enemy
   * @param {number} distance - Distance between character and boss
   */
  handleBossWalking(boss, distance){
    if(boss.bossState !== 'walking') return;
    
    let attackDistance = boss.x < this.character.x ? 200 : 80;
    
    if(distance > attackDistance){
      this.moveBossTowardsCharacter(boss);
    }
    
    if(distance <= attackDistance && !this.character.isDead()){
      this.startBossAttack(boss);
    }
  }

  /**
   * Moves the boss towards the character's position
   * @param {Boss} boss - The boss enemy
   */
  moveBossTowardsCharacter(boss){
    if(this.character.x < boss.x){
      boss.x -= boss.speed;
      boss.otherDirection = false;
    } else {
      boss.x += boss.speed;
      boss.otherDirection = true;
    }
  }

  /**
   * Initiates a boss attack sequence
   * @param {Boss} boss - The boss enemy
   */
  startBossAttack(boss){
    boss.bossState = 'attacking';
    boss.currentImageIndex = 0;
    setTimeout(() => {
      this.executeBossAttack(boss);
    }, 1050);
  }

  /**
   * Executes the boss attack and applies damage if character is in range
   * @param {Boss} boss - The boss enemy
   */
  executeBossAttack(boss){
    if(this.character.isDead()) return;
    
    let hitRange = boss.x < this.character.x ? 250 : 250;
    let endDistance = Math.abs(this.character.x - boss.x);
    if(endDistance <= hitRange && !this.character.isHurt() && !this.character.isDead()){
      this.damageCharacterByBoss();
    }
    if(!this.character.isDead()){
      boss.bossState = 'walking';
    }
  }

  /**
   * Applies damage to character when hit by boss attack
   */
  damageCharacterByBoss(){
    this.character.energy -= 20;
    if(this.character.energy < 0) this.character.energy = 0;
    this.healthBar.setPercentage(this.character.energy);
    this.character.lastHit = Date.now();
    this.soundManager.playHit();
    console.log('Boss attacked! Character energy:', this.character.energy);
  }

  /**
   * Adds an array of objects to the game map
   * @param {Array} objects - Array of game objects to add
   */
  addObjectsToMap(objects){
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single object to the map with proper image orientation
   * @param {MovableObject} movableImage - The object to draw
   */
  addToMap(movableImage) {
    if (movableImage.otherDirection) {
      this.flipImage(movableImage);
    }

    movableImage.draw(this.ctx);
    movableImage.drawFrame(this.ctx);

    if (movableImage.otherDirection) {
      this.flipImageBack(movableImage);
    }
  }

  /**
   * Flips the canvas context to mirror the image horizontally
   * @param {MovableObject} movableImage - The object to flip
   */
  flipImage(movableImage) {
    this.ctx.save();
    this.ctx.translate(movableImage.x + movableImage.width / 2, 0);
    this.ctx.scale(-1, 1);
    this.ctx.translate(-(movableImage.x + movableImage.width / 2), 0);
  }

  /**
   * Restores the canvas context after flipping
   */
  flipImageBack() {
    this.ctx.restore();
  }
} 
