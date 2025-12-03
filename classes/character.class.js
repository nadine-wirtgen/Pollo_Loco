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
  currentImageIndex = 0;
  world;
  deadAnimationFinished = false;
  deadAnimationStarted = false;
  lastMovement = Date.now();
  wasAboveGround = false;
  isSnoozing = false;
  offset = {
    top: 100,
    bottom: 10,
    left: 10,
    right: 10
  }

  constructor(){
    super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravity();
    this.animate();
    this.getReaLFrame();
  }

  hit(damage = 10){
    super.hit(damage);
    this.world.soundManager.playHit();
  }

  isHurt(){
    if(this.isDead()) return false;
    let timepassed = (Date.now() - this.lastHit) / 1000;
    return timepassed < 0.5;
  }

  isDead(){
    if(this.energy < 20 && !this.deadAnimationStarted){
      this.deadAnimationStarted = true;
      this.currentImageIndex = 0;
    }
    return this.energy < 20;
  }

  animate(){
    setInterval(() => {
      if (this.isDead()) return; // prevent movement when dead
      
      // Check if game is won (boss is dead)
      if(this.world.gameWon) return; // prevent movement when game is won
      
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

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.world.soundManager.playJump();
        this.lastMovement = Date.now();
      }

      if (this.world.keyboard.D) {
        this.lastMovement = Date.now();
      }
      
      // Check if character just landed
      if (this.wasAboveGround && !this.isAboveGround()) {
        this.world.soundManager.playLand();
      }
      this.wasAboveGround = this.isAboveGround();
      
      // Kamera stoppt am Level-Ende, folgt aber noch nach links
      if (this.x < this.world.level.level_end_x - 100) {
        this.world.camera_x = -this.x + 100;
      } else {
        this.world.camera_x = -(this.world.level.level_end_x - 100) + 100;
      }
    }, 1000 / 60);


    setInterval(() => {
      let idleTime = (Date.now() - this.lastMovement) / 1000;
      
      if(this.isDead()){
        if (!this.deadAnimationFinished) {
          this.deadAnimationFinished = this.playAnimationOnce(this.IMAGES_DEAD);
        }
      } else if (this.world.gameWon) {
        // Stop all animations when game is won
        return;
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()){
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (idleTime > 5) {
        // Sleep animation
        if (!this.isSnoozing) {
          this.world.soundManager.playSnooze();
          this.isSnoozing = true;
        }
        this.playAnimation(this.IMAGES_SLEEP);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        // walking animation
        if (this.isSnoozing) {
          this.world.soundManager.stopSnooze();
          this.isSnoozing = false;
        }
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        if (this.isSnoozing) {
          this.world.soundManager.stopSnooze();
          this.isSnoozing = false;
        }
        this.playAnimation([this.IMAGES_JUMPING[0]]);
      }
    }, 100);
  }
}