class Character extends MovableObject {
  height = 200;
  width = 100;
  y = 226;
  realX;
  realY;
  realWidth;
  realHeight;
  speed = 8;
  IMAGES_WALKING = [
    'assets/img/2_character_pepe/2_walk/W-21.png',
    'assets/img/2_character_pepe/2_walk/W-22.png',
    'assets/img/2_character_pepe/2_walk/W-23.png',
    'assets/img/2_character_pepe/2_walk/W-24.png',
    'assets/img/2_character_pepe/2_walk/W-25.png',
    'assets/img/2_character_pepe/2_walk/W-26.png'
  ];
  IMAGES_JUMPING = [
    'assets/img/2_character_pepe/3_jump/J-31.png',
    'assets/img/2_character_pepe/3_jump/J-32.png',
    'assets/img/2_character_pepe/3_jump/J-33.png',
    'assets/img/2_character_pepe/3_jump/J-34.png',
    'assets/img/2_character_pepe/3_jump/J-35.png',
    'assets/img/2_character_pepe/3_jump/J-36.png',
    'assets/img/2_character_pepe/3_jump/J-37.png',
    'assets/img/2_character_pepe/3_jump/J-38.png',
    'assets/img/2_character_pepe/3_jump/J-39.png'
  ];
  IMAGES_HURT = [
    'assets/img/2_character_pepe/4_hurt/H-41.png',
    'assets/img/2_character_pepe/4_hurt/H-42.png',
    'assets/img/2_character_pepe/4_hurt/H-43.png'
  ];
  IMAGES_DEAD = [
    'assets/img/2_character_pepe/5_dead/D-51.png',
    'assets/img/2_character_pepe/5_dead/D-52.png',
    'assets/img/2_character_pepe/5_dead/D-53.png',
    'assets/img/2_character_pepe/5_dead/D-54.png',
    'assets/img/2_character_pepe/5_dead/D-55.png',
    'assets/img/2_character_pepe/5_dead/D-56.png',
    'assets/img/2_character_pepe/5_dead/D-57.png'
  ];
  IMAGES_SLEEP =[
    'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
  ]
  IMAGES_IDLE = [
    'assets/img/2_character_pepe/1_idle/idle/I-1.png',
    'assets/img/2_character_pepe/1_idle/idle/I-2.png',
    'assets/img/2_character_pepe/1_idle/idle/I-3.png',
    'assets/img/2_character_pepe/1_idle/idle/I-4.png',
    'assets/img/2_character_pepe/1_idle/idle/I-5.png',
    'assets/img/2_character_pepe/1_idle/idle/I-6.png',
    'assets/img/2_character_pepe/1_idle/idle/I-7.png',
    'assets/img/2_character_pepe/1_idle/idle/I-8.png',
    'assets/img/2_character_pepe/1_idle/idle/I-9.png',
    'assets/img/2_character_pepe/1_idle/idle/I-10.png'
  ]
  currentImageIndex = 0;
  jumpImageIndex = 0;
  spacePressed = false;
  world;
  deadAnimationFinished = false;
  deadAnimationStarted = false;
  lastMovement = Date.now();
  wasAboveGround = false;
  isSnoozing = false;
  offset = {
    top: 100,
    bottom: 10,
    left: 16,
    right: 26
  }

  /**
   * Initializes a new character instance with images and animations
   */
  constructor(){
    super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_IDLE);
    this.applyGravity();
    this.animate();
    this.getReaLFrame();
  }

  /**
   * Handles character being hit by an enemy
   * @param {number} damage - Amount of damage to apply (default: 10)
   */
  hit(damage = 10){
    super.hit(damage);
    this.world.soundManager.playHit();
  }

  /**
   * Checks if the character is currently in hurt state
   * @returns {boolean} True if character was hit in the last 0.5 seconds and is not dead
   */
  isHurt(){
    if(this.isDead()) return false;
    let timepassed = (Date.now() - this.lastHit) / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks if the character is dead and initializes death animation
   * @returns {boolean} True if character's energy is below 20
   */
  isDead(){
    if(this.energy < 20 && !this.deadAnimationStarted){
      this.deadAnimationStarted = true;
      this.currentImageIndex = 0;
    }
    return this.energy < 20;
  }

  /**
   * Starts the character's animation loops for movement and visual animations
   */
  animate(){
    setInterval(() => this.handleMovement(), 1000 / 60);
    setInterval(() => this.handleAnimations(), 80);
  }

  /**
   * Processes character movement, keyboard input, sounds, and camera updates
   */
  handleMovement(){
    if (this.isDead() || this.world.gameWon || this.world.bossAlertActive) return;
    this.handleKeyboardInput();
    this.handleLandingSound();
    this.updateCamera();
  }

  /**
   * Processes keyboard input for character movement and actions
   */
  handleKeyboardInput(){
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x + 350) {
      this.moveRight();
      this.otherDirection = false;
      this.lastMovement = Date.now();
    }

    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.lastMovement = Date.now();
    }

    if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.spacePressed) {
      this.jump();
      this.jumpImageIndex = 0;
      this.spacePressed = true;
      this.world.soundManager.playJump();
      this.lastMovement = Date.now();
    }
    
    // Reset space flag when key is released
    if(!this.world.keyboard.SPACE){
      this.spacePressed = false;
    }

    if (this.world.keyboard.D) {
      this.lastMovement = Date.now();
    }
  }

  /**
   * Plays landing sound when character touches the ground after being in the air
   */
  handleLandingSound(){
    if (this.wasAboveGround && !this.isAboveGround()) {
      this.world.soundManager.playLand();
    }
  }

  /**
   * Updates the camera position to follow the character
   */
  updateCamera(){
    if (this.x < this.world.level.level_end_x - 100) {
      this.world.camera_x = -this.x + 100;
    } else {
      this.world.camera_x = -(this.world.level.level_end_x - 100) + 100;
    }
  }

  /**
   * Manages character animations based on current state (dead, hurt, jumping, idle, walking)
   */
  handleAnimations(){
    if(this.isDead()){
      this.playDeathAnimation();
    } else if (this.world.gameWon) {
      return;
    } else if (this.world.bossAlertActive) {
      this.playAnimation(this.IMAGES_IDLE);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()){
      this.handleJumpAnimation();
    } else {
      this.handleIdleAnimations();
    }
  }

  /**
   * Plays the death animation sequence once
   */
  playDeathAnimation(){
    if (!this.deadAnimationFinished) {
      this.deadAnimationFinished = this.playAnimationOnce(this.IMAGES_DEAD);
    }
  }

  /**
   * Handles jump animation - plays through jump frames
   */
  handleJumpAnimation(){
    let i = this.jumpImageIndex % this.IMAGES_JUMPING.length;
    let path = this.IMAGES_JUMPING[i];
    this.img = this.imageCache[path];
    this.jumpImageIndex++;
  }

  /**
   * Manages idle and sleep animations based on inactivity time
   */
  handleIdleAnimations(){
    let idleTime = (Date.now() - this.lastMovement) / 1000;
    
    if (idleTime > 5) {
      this.playSleepAnimation();
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.stopSleepAnimation();
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.stopSleepAnimation();
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Plays the sleep animation and sound when character is idle for too long
   */
  playSleepAnimation(){
    if (!this.isSnoozing) {
      this.world.soundManager.playSnooze();
      this.isSnoozing = true;
    }
    this.playAnimation(this.IMAGES_SLEEP);
  }

  /**
   * Stops the sleep animation and sound when character becomes active
   */
  stopSleepAnimation(){
    if (this.isSnoozing) {
      this.world.soundManager.stopSnooze();
      this.isSnoozing = false;
    }
  }
}