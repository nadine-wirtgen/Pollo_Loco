class Boss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  x = 1650;
  energy = 100;
  speed = 5;
  offset = {
    top: 10,
    bottom: 10,
    left: 60,
    right: 30
  };
  bossState = 'idle'; // idle, alert, walking, attacking
  hadFirstContact = false;
  attackAnimationIndex = 0;
  deadAnimationFinished = false;
  deadAnimationStarted = false;
  IMAGES_ALERT = [
    '../assets/img/4_enemie_boss_chicken/2_alert/G5.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G6.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G7.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G8.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G9.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G10.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G11.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G12.png'
  ];
  IMAGES_WALKING = [
    '../assets/img/4_enemie_boss_chicken/1_walk/G1.png',
    '../assets/img/4_enemie_boss_chicken/1_walk/G2.png',
    '../assets/img/4_enemie_boss_chicken/1_walk/G3.png',
    '../assets/img/4_enemie_boss_chicken/1_walk/G4.png'
  ];
  IMAGES_ATTACK = [
    '../assets/img/4_enemie_boss_chicken/3_attack/G13.png',
    '../assets/img/4_enemie_boss_chicken/3_attack/G14.png',
    '../assets/img/4_enemie_boss_chicken/3_attack/G15.png',
    '../assets/img/4_enemie_boss_chicken/3_attack/G16.png',
    '../assets/img/4_enemie_boss_chicken/3_attack/G17.png',
    '../assets/img/4_enemie_boss_chicken/3_attack/G18.png',
    '../assets/img/4_enemie_boss_chicken/3_attack/G19.png',
    '../assets/img/4_enemie_boss_chicken/3_attack/G20.png'
  ];
  IMAGES_DEAD = [
    '../assets/img/4_enemie_boss_chicken/5_dead/G24.png',
    '../assets/img/4_enemie_boss_chicken/5_dead/G25.png',
    '../assets/img/4_enemie_boss_chicken/5_dead/G26.png'
  ];
  deadAnimationFinished = false;

  constructor(){
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }
  
  animate(){
    // Alert animation (slower)
    setInterval(() => {
      if(!this.isDead() && this.bossState === 'alert'){
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 400);
    
    // Death animation (faster)
    setInterval(() => {
      if(this.isDead()){
        // Adjust height and y position for dead animation
        this.height = 300;
        this.y = 150;
        
        // Reset animation index when death animation starts
        if(!this.deadAnimationStarted){
          this.currentImageIndex = 0;
          this.deadAnimationStarted = true;
        }
        
        if (!this.deadAnimationFinished) {
          this.deadAnimationFinished = this.playAnimationOnce(this.IMAGES_DEAD);
        }
      }
    }, 60);
    
    // Walking and attack animations
    setInterval(() => {
      if(this.isDead()) return; // No walking/attack animation when dead
      if(this.bossState === 'walking'){
        this.playAnimation(this.IMAGES_WALKING);
      } else if(this.bossState === 'attacking'){
        this.playAnimation(this.IMAGES_ATTACK);
      }
    }, 150);
  }
}
