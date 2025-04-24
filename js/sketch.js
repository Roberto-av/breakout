let game;
let movingLeft = false;
let movingRight = false;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("game-container");
  game = new Game();
}

function draw() {
  background(30);

  if (game.state === "playing") {
    if (movingLeft) game.paddle.move(-1);
    if (movingRight) game.paddle.move(1);
  }

  game.update();
  game.draw();

  if (game.lives <= 0) {
    noLoop();
    background(0);
    fill(255);
    textSize(32);
    text("Game Over", width / 2 - 80, height / 2);
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    game.keyPressed(keyCode);
    return;
  }

  if (key === "a" || key === "A") movingLeft = true;
  if (key === "d" || key === "D") movingRight = true;
  if (key === " ") game.ball.launch();
}

function keyReleased() {
  if (key === "a" || key === "A") movingLeft = false;
  if (key === "d" || key === "D") movingRight = false;
}
