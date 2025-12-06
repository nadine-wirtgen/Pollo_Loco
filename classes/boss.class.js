class Boss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  x = 3800;
  energy = 100;
  speed = 5;
  offset = {
    top: 50,
    bottom: 30,
    left: 80,
    right: 50
  };
  bossState = 'idle'; // idle, alert, walking, attacking
  hadFirstContact = false;
  attackAnimationIndex = 0;
  deadAnimationFinished = false;
  deadAnimationStarted = false;
  IMAGES_ALERT = [
    'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
  ];
  IMAGES_WALKING = [
    'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
    'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
    'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
    'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
  ];
  IMAGES_ATTACK = [
    'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
  ];
  IMAGES_HURT = [
    'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
    'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
    'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];
  IMAGES_DEAD = [
    'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
    'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
    'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
  ];
  deadAnimationFinished = false;

  /**
   * Initializes the boss enemy with images and animations
   */
  constructor(){
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }
  
  /**
   * Starts all boss animation intervals
   */
  animate(){
    setInterval(() => this.animateAlert(), 400);
    setInterval(() => this.animateDeath(), 60);
    setInterval(() => this.animateHurt(), 100);
    setInterval(() => this.animateWalkingAndAttack(), 150);
  }

  /**
   * Plays the alert animation when boss is in alert state
   */
  animateAlert(){
    if(!this.isDead() && this.bossState === 'alert'){
      this.playAnimation(this.IMAGES_ALERT);
    }
  }

  /**
   * Plays the death animation when boss is dead
   * Adjust height and y position for dead animation
   * Resets animation index when death animation starts
   */
  animateDeath(){
    if(this.isDead()){ 
      this.height = 300;
      this.y = 150;
      
      if(!this.deadAnimationStarted){
        this.currentImageIndex = 0;
        this.deadAnimationStarted = true;
      }
      
      if (!this.deadAnimationFinished) {
        this.deadAnimationFinished = this.playAnimationOnce(this.IMAGES_DEAD);
      }
    }
  }

  /**
   * Plays the hurt animation when boss is hurt
   */
  animateHurt(){
    if(!this.isDead() && this.isHurt()){
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  /**
   * Plays walking and attack animations based on boss state
   * No walking/attack animation when dead or hurt
   */
  animateWalkingAndAttack(){
    if(this.isDead() || this.isHurt()) return;
    if(this.bossState === 'walking'){
      this.playAnimation(this.IMAGES_WALKING);
    } else if(this.bossState === 'attacking'){
      this.playAnimation(this.IMAGES_ATTACK);
    }
  }
}
