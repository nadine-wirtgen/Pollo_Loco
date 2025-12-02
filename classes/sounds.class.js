class SoundManager {
  menuMusic = new Audio('assets/audio/music/menu_music.mp3');
  gameMusic = new Audio('assets/audio/music/game_music.mp3');
  jumpSound = new Audio('assets/audio/character/character_jump.mp3');
  landSound = new Audio('assets/audio/character/character_on_ground.mp3');
  snoozeSound = new Audio('assets/audio/character/character_snooze.mp3');
  isMuted = false;
  
  constructor() {
    this.menuMusic.loop = true;
    this.gameMusic.loop = true;
    this.menuMusic.volume = 0.3;
    this.gameMusic.volume = 0.3;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.menuMusic.muted = this.isMuted;
    this.gameMusic.muted = this.isMuted;
    this.jumpSound.muted = this.isMuted;
    this.landSound.muted = this.isMuted;
    this.snoozeSound.muted = this.isMuted;
    return this.isMuted;
  }

  startMenuMusic() {
    this.menuMusic.play().catch(e => console.log('Menu music play failed:', e));
  }

  stopMenuMusic() {
    this.menuMusic.pause();
    this.menuMusic.currentTime = 0;
  }

  startGameMusic() {
    this.gameMusic.play().catch(e => console.log('Game music play failed:', e));
  }

  stopGameMusic() {
    this.gameMusic.pause();
    this.gameMusic.currentTime = 0;
  }

  playJump() {
    this.jumpSound.play().catch(e => console.log('Jump sound play failed:', e));
  }

  playLand() {
    this.landSound.play().catch(e => console.log('Land sound play failed:', e));
  }

  playSnooze() {
    this.snoozeSound.play().catch(e => console.log('Snooze sound play failed:', e));
  }

  stopSnooze() {
    this.snoozeSound.pause();
    this.snoozeSound.currentTime = 0;
  }

  resetGameMusic() {
    this.stopGameMusic();
    this.stopMenuMusic();
    this.startGameMusic();
  }
}