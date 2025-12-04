class SoundManager {
  menuMusic = new Audio('assets/audio/music/menu_music.mp3');
  gameMusic = new Audio('assets/audio/music/game_music.mp3');
  jumpSound = new Audio('assets/audio/character/character_jump.mp3');
  landSound = new Audio('assets/audio/character/character_on_ground.mp3');
  snoozeSound = new Audio('assets/audio/character/character_snooze.mp3');
  hitSound = new Audio('assets/audio/character/hit1.mp3');
  coinSound = new Audio('assets/audio/items/collect_coin.mp3');
  chickenDeathSound = new Audio('assets/audio/chicken/chicken1.mp3');
  chickenDeathSound2 = new Audio('assets/audio/chicken/chicken2.mp3');
  chickenDeathSound3 = new Audio('assets/audio/chicken/chicken3.mp3');
  bossScreamSound = new Audio('assets/audio/boss/chicken_start_scream.mp3');
  bottleCollectSound = new Audio('assets/audio/boss/collect_bottle/collect_bottle_1.mp3');
  bottleCollectSound2 = new Audio('assets/audio/boss/collect_bottle/collect_bottle_2.mp3');
  bottleCollectSound3 = new Audio('assets/audio/boss/collect_bottle/collect_bottle_3.mp3');
  isMuted = false;
  lastHitSoundTime = 0;
  
  constructor() {
    this.menuMusic.loop = true;
    this.gameMusic.loop = true;
    this.menuMusic.volume = 0.3;
    this.gameMusic.volume = 0.3;
    this.loadMuteState();
  }

  loadMuteState() {
    const savedMuteState = localStorage.getItem('isMuted');
    if (savedMuteState !== null) {
      this.isMuted = savedMuteState === 'true';
      this.applyMuteState();
    }
  }

  applyMuteState() {
    this.menuMusic.muted = this.isMuted;
    this.gameMusic.muted = this.isMuted;
    this.jumpSound.muted = this.isMuted;
    this.landSound.muted = this.isMuted;
    this.snoozeSound.muted = this.isMuted;
    this.hitSound.muted = this.isMuted;
    this.coinSound.muted = this.isMuted;
    this.chickenDeathSound.muted = this.isMuted;
    this.chickenDeathSound2.muted = this.isMuted;
    this.chickenDeathSound3.muted = this.isMuted;
    this.bossScreamSound.muted = this.isMuted;
    this.bottleCollectSound.muted = this.isMuted;
    this.bottleCollectSound2.muted = this.isMuted;
    this.bottleCollectSound3.muted = this.isMuted;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.applyMuteState();
    localStorage.setItem('isMuted', this.isMuted);
    return this.isMuted;
  }

  startMenuMusic() {
    this.menuMusic.play().catch(() => {});
  }

  stopMenuMusic() {
    this.menuMusic.pause();
    this.menuMusic.currentTime = 0;
  }

  startGameMusic() {
    this.gameMusic.play().catch(() => {});
  }

  stopGameMusic() {
    this.gameMusic.pause();
    this.gameMusic.currentTime = 0;
  }

  playJump() {
    if (!this.isMuted) {
      this.jumpSound.currentTime = 0;
      this.jumpSound.play().catch(e => console.log('Jump sound play failed:', e));
    }
  }

  playLand() {
    if (!this.isMuted) {
      this.landSound.currentTime = 0;
      this.landSound.play().catch(e => console.log('Land sound play failed:', e));
    }
  }

  playSnooze() {
    if (!this.isMuted) {
      this.snoozeSound.play().catch(e => console.log('Snooze sound play failed:', e));
    }
  }

  stopSnooze() {
    this.snoozeSound.pause();
    this.snoozeSound.currentTime = 0;
  }

  playHit() {
    if (!this.isMuted) {
      const now = Date.now();
      // Prevent hit sound from playing more than once per 200ms
      if (now - this.lastHitSoundTime < 200) return;
      this.lastHitSoundTime = now;
      
      const hitClone = this.hitSound.cloneNode();
      hitClone.play().catch(e => console.log('Hit sound play failed:', e));
    }
  }

  playCoin() {
    if (!this.isMuted) {
      this.coinSound.currentTime = 0;
      this.coinSound.play().catch(e => console.log('Coin sound play failed:', e));
    }
  }

  playChickenDeath() {
    if (!this.isMuted) {
      const randomChicken = Math.floor(Math.random() * 3) + 1;
      const chickenSound = this[`chickenDeathSound${randomChicken === 1 ? '' : randomChicken}`];
      chickenSound.currentTime = 0;
      chickenSound.play().catch(e => console.log('Chicken death sound play failed:', e));
    }
  }

  playBossScream() {
    if (!this.isMuted) {
      this.bossScreamSound.currentTime = 0;
      this.bossScreamSound.play().catch(e => console.log('Boss scream play failed:', e));
    }
  }

  playBottleCollect() {
    if (!this.isMuted) {
      const randomBottle = Math.floor(Math.random() * 3) + 1;
      const bottleSound = this[`bottleCollectSound${randomBottle === 1 ? '' : randomBottle}`];
      bottleSound.currentTime = 0;
      bottleSound.play().catch(e => console.log('Bottle collect sound play failed:', e));
    }
  }

  resetGameMusic() {
    this.stopGameMusic();
    this.stopMenuMusic();
    this.startGameMusic();
  }
}