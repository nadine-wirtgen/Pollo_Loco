let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

/**
 * Toggles the sound mute state and updates the mute icon.
 */
function toggleSound() {
  const isMuted = soundManager.toggleMute();
  const icon = document.getElementById('muteIcon');
  icon.src = isMuted ? 'assets/icons/sound_off.png' : 'assets/icons/sound_on.png';
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

// Close modal when clicking outside
document.addEventListener('click', (event) => {
  const controlsModal = document.getElementById('controlsModal');
  
  if (event.target === controlsModal) {
    closeControls();
  }
});

// Start menu music on first user interaction
document.addEventListener('click', () => {
  if (soundManager.menuMusic.paused && !world) {
    soundManager.startMenuMusic();
  }
}, { once: false });

// Also try on button hover
window.addEventListener('load', () => {
  const startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('mouseenter', () => {
      if (soundManager.menuMusic.paused && !world) {
        soundManager.startMenuMusic();
      }
    }, { once: true });
  }

  // Mobile touch controls
  const bindButton = (id, key) => {
    const btn = document.getElementById(id);
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard[key] = true; });
    btn.addEventListener('touchend', (e) => { e.preventDefault(); keyboard[key] = false; });
    btn.addEventListener('mousedown', (e) => { e.preventDefault(); keyboard[key] = true; });
    btn.addEventListener('mouseup', (e) => { e.preventDefault(); keyboard[key] = false; });
  };

  bindButton('jumpBtn', 'SPACE');
  bindButton('throwBtn', 'D');
  bindButton('leftBtn', 'LEFT');
  bindButton('rightBtn', 'RIGHT');

  // Update mute icon on page load
  updateMuteIcon();
});

/**
 * Updates the mute icon based on the current mute state.
 */
function updateMuteIcon() {
  const icon = document.getElementById('muteIcon');
  icon.src = soundManager.isMuted ? 'assets/icons/sound_off.png' : 'assets/icons/sound_on.png';
}

/**
 * Starts a new game by initializing the world and switching to game mode.
 */
function startGame() {
  soundManager.stopMenuMusic();
  soundManager.startGameMusic();
  
  document.getElementById('startScreen').style.display = 'none';
  document.querySelector('.topButtons').style.display = 'none';
  document.getElementById('mobileControls').classList.add('active');
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
  document.getElementById('mobileControls').classList.add('active');
  
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
  document.getElementById('mobileControls').classList.remove('active');
}

window.addEventListener("keydown", (e) => {

  console.log("Key down: " + e.key);

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


  console.log(e);
});

window.addEventListener("keyup", (e) => {

  console.log("Key up: " + e.key);

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


  console.log(e);
});