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
  
  /**
   * Initializes the sound manager with all audio files and loads mute state
   */
  constructor() {
    this.menuMusic.loop = true;
    this.gameMusic.loop = true;
    this.menuMusic.volume = 0.3;
    this.gameMusic.volume = 0.3;
    this.loadMuteState();
  }

  /**
   * Loads the mute state from localStorage
   */
  loadMuteState() {
    const savedMuteState = localStorage.getItem('isMuted');
    if (savedMuteState !== null) {
      this.isMuted = savedMuteState === 'true';
      this.applyMuteState();
    }
  }

  /**
   * Applies the current mute state to all audio elements
   */
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

  /**
   * Toggles the mute state and saves it to localStorage
   * @returns {boolean} The new mute state
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.applyMuteState();
    localStorage.setItem('isMuted', this.isMuted);
    return this.isMuted;
  }

  /**
   * Starts playing the menu music
   */
  startMenuMusic() {
    this.menuMusic.play().catch(() => {});
  }

  /**
   * Stops the menu music and resets it to the beginning
   */
  stopMenuMusic() {
    this.menuMusic.pause();
    this.menuMusic.currentTime = 0;
  }

  /**
   * Starts playing the game music
   */
  startGameMusic() {
    this.gameMusic.play().catch(() => {});
  }

  /**
   * Stops the game music and resets it to the beginning
   */
  stopGameMusic() {
    this.gameMusic.pause();
    this.gameMusic.currentTime = 0;
  }

  /**
   * Plays the jump sound effect
   */
  playJump() {
    if (!this.isMuted) {
      this.jumpSound.currentTime = 0;
      this.jumpSound.play().catch(e => {});
    }
  }

  /**
   * Plays the landing sound effect
   */
  playLand() {
    if (!this.isMuted) {
      this.landSound.currentTime = 0;
      this.landSound.play().catch(e => {});
    }
  }

  /**
   * Plays the snooze/sleeping sound effect
   */
  playSnooze() {
    if (!this.isMuted) {
      this.snoozeSound.play().catch(e => {});
    }
  }

  /**
   * Stops the snooze sound and resets it
   */
  stopSnooze() {
    this.snoozeSound.pause();
    this.snoozeSound.currentTime = 0;
  }

  /**
   * Plays the hit sound effect with rate limiting to prevent overlapping
   */
  playHit() {
    if (!this.isMuted) {
      const now = Date.now();
      // Prevent hit sound from playing more than once per 200ms
      if (now - this.lastHitSoundTime < 200) return;
      this.lastHitSoundTime = now;
      
      const hitClone = this.hitSound.cloneNode();
      hitClone.play().catch(e => {});
    }
  }

  /**
   * Plays the coin collection sound effect
   */
  playCoin() {
    if (!this.isMuted) {
      this.coinSound.currentTime = 0;
      this.coinSound.play().catch(e => {});
    }
  }

  /**
   * Plays a random chicken death sound effect
   */
  playChickenDeath() {
    if (!this.isMuted) {
      const randomChicken = Math.floor(Math.random() * 3) + 1;
      const chickenSound = this[`chickenDeathSound${randomChicken === 1 ? '' : randomChicken}`];
      chickenSound.currentTime = 0;
      chickenSound.play().catch(e => {});
    }
  }

  /**
   * Plays the boss scream sound effect
   */
  playBossScream() {
    if (!this.isMuted) {
      this.bossScreamSound.currentTime = 0;
      this.bossScreamSound.play().catch(e => {});
    }
  }

  /**
   * Plays a random bottle collection sound effect
   */
  playBottleCollect() {
    if (!this.isMuted) {
      const randomBottle = Math.floor(Math.random() * 3) + 1;
      const bottleSound = this[`bottleCollectSound${randomBottle === 1 ? '' : randomBottle}`];
      bottleSound.currentTime = 0;
      bottleSound.play().catch(e => {});
    }
  }

  /**
   * Stops all music and restarts the game music
   */
  resetGameMusic() {
    this.stopGameMusic();
    this.stopMenuMusic();
    this.startGameMusic();
  }
}