let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

/**
 * Toggles the sound mute state and updates the mute icon.
 */
function toggleSound() {
  const isMuted = soundManager.toggleMute();
  const iconGame = document.getElementById('muteIcon');
  const iconMenu = document.querySelector('.muteIconMenu');
  const newSrc = isMuted ? 'assets/icons/sound_off.png' : 'assets/icons/sound_on.png';
  if (iconGame) iconGame.src = newSrc;
  if (iconMenu) iconMenu.src = newSrc;
}

/**
 * Displays the controls modal dialog.
 */
function showControls() {
  document.getElementById('controlsModal').style.display = 'flex';
}

/**
 * Closes the controls modal dialog.
 */
function closeControls() {
  document.getElementById('controlsModal').style.display = 'none';
}

// Start menu music on first user interaction
document.addEventListener('click', () => {
  if (soundManager.menuMusic.paused && !world) {
    soundManager.startMenuMusic();
  }
}, { once: false });

window.addEventListener('load', () => {
  initMobileControls();
  updateMuteIcon();
});

/**
 * Initializes mobile control buttons with touch and mouse events
 */
function initMobileControls() {
  bindControlButton('jumpBtn', 'SPACE');
  bindControlButton('throwBtn', 'D');
  bindControlButton('leftBtn', 'LEFT');
  bindControlButton('rightBtn', 'RIGHT');
}

/**
 * Binds touch and mouse events to a control button
 * @param {string} id - The button element ID
 * @param {string} key - The keyboard key to bind to
 */
function bindControlButton(id, key) {
  const btn = document.getElementById(id);
  btn.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard[key] = true; });
  btn.addEventListener('touchend', (e) => { e.preventDefault(); keyboard[key] = false; });
  btn.addEventListener('mousedown', (e) => { e.preventDefault(); keyboard[key] = true; });
  btn.addEventListener('mouseup', (e) => { e.preventDefault(); keyboard[key] = false; });
}

/**
 * Updates the mute icon based on the current mute state.
 */
function updateMuteIcon() {
  const iconGame = document.getElementById('muteIcon');
  const iconMenu = document.querySelector('.muteIconMenu');
  const newSrc = soundManager.isMuted ? 'assets/icons/sound_off.png' : 'assets/icons/sound_on.png';
  if (iconGame) iconGame.src = newSrc;
  if (iconMenu) iconMenu.src = newSrc;
}

/**
 * Starts a new game by initializing the world and switching to game mode.
 */
function startGame() {
  soundManager.stopMenuMusic();
  soundManager.startGameMusic();
  
  document.getElementById('startScreen').style.display = 'none';
  document.querySelector('.topButtons').style.display = 'none';
  document.getElementById('muteButtonMenu').style.display = 'none';
  document.querySelector('.topButtonsGame').style.display = 'flex';
  document.getElementById('mobileControls').classList.add('active');
  document.getElementById('backToMenuButton').style.display = 'block';
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, soundManager);
}

/**
 * Restarts the game by stopping the current world and creating a new one.
 */
function restartGame() {
  // Stop old world completely
  if (world) {
    world.stop();
  }
  
  // Reset music
  soundManager.resetGameMusic();
  
  // Hide all screens
  document.getElementById('gameOverScreen').style.display = 'none';
  document.getElementById('youWinScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('muteButtonMenu').style.display = 'none';
  document.querySelector('.topButtonsGame').style.display = 'flex';
  document.getElementById('mobileControls').classList.add('active');
  document.getElementById('backToMenuButton').style.display = 'block';
  
  // Create new world
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, soundManager);
}

/**
 * Returns to the main menu from the game or end screens.
 */
function backToMenu() {
  // Stop old world completely
  if (world) {
    world.stop();
    world = null;
  }
  
  // Stop game music and start menu music
  soundManager.stopGameMusic();
  soundManager.startMenuMusic();
  
  // Hide all screens and show start screen
  document.getElementById('gameOverScreen').style.display = 'none';
  document.getElementById('youWinScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'flex';
  document.querySelector('.topButtons').style.display = 'flex';
  document.getElementById('muteButtonMenu').style.display = 'flex';
  document.querySelector('.topButtonsGame').style.display = 'none';
  document.getElementById('mobileControls').classList.remove('active');
  document.getElementById('backToMenuButton').style.display = 'none';
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    keyboard.RIGHT = true;
  }

  if (e.key === "ArrowLeft") {
    keyboard.LEFT = true;
  }

  if (e.key === "ArrowUp") {
    keyboard.UP = true;
  }

  if (e.key === "ArrowDown") {
    keyboard.DOWN = true;
  }

  if (e.key === " ") {
    keyboard.SPACE = true;
  }

  if (e.key === "d" || e.key === "D") {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    keyboard.RIGHT = false;
  }

  if (e.key === "ArrowLeft") {
    keyboard.LEFT = false;
  }

  if (e.key === "ArrowUp") {
    keyboard.UP = false;
  }

  if (e.key === "ArrowDown") {
    keyboard.DOWN = false;
  }

  if (e.key === " ") {
    keyboard.SPACE = false;
  }

  if (e.key === "d" || e.key === "D") {
    keyboard.D = false;
  }
});