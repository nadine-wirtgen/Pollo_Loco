class SoundManager {
  menuMusic = new Audio('assets/audio/music/menu_music.mp3');
  gameMusic = new Audio('assets/audio/music/game_music.mp3');
  jumpSound = new Audio('assets/audio/character/character_jump.mp3');
  landSound = new Audio('assets/audio/character/character_on_ground.mp3');
  
  constructor() {
    this.menuMusic.loop = true;
    this.gameMusic.loop = true;
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

  resetGameMusic() {
    this.stopGameMusic();
    this.stopMenuMusic();
    this.startGameMusic();
  }
}