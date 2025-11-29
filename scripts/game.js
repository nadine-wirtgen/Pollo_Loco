let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

function startGame() {
  gameStarted = true;
  localStorage.setItem('gameStarted', 'true');
  document.getElementById('startScreen').style.display = 'none';
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function restartGame() {
  document.getElementById('gameOverScreen').style.display = 'none';
  document.getElementById('youWinScreen').style.display = 'none';
  location.reload();
}

// Check if game was already started (after restart)
window.addEventListener('load', () => {
  if (localStorage.getItem('gameStarted') === 'true') {
    localStorage.removeItem('gameStarted');
    startGame();
  }
});

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