let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

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
});

function startGame() {
  soundManager.stopMenuMusic();
  soundManager.startGameMusic();
  
  document.getElementById('startScreen').style.display = 'none';
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, soundManager);
}

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
  
  // Create new world
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, soundManager);
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