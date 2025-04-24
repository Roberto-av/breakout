class Game {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.paddle = new Paddle();
    this.ball = new Ball();
    this.levelObj = new Level(this.level);
    this.state = "playing";
    this.levelMessageTimer = 0;
    this.ballSpeed = 20;
  }

  update() {
    if (this.state === "paused") {
      return;
    }

    if (this.state === "nextLevel") {
      // Espera unos segundos antes de continuar
      if (millis() > this.levelMessageTimer + 1000) {
        this.state = "playing";
      }
      return;
    }

    this.ball.update(this.paddle, this.levelObj.blocks, this);

    // Si se rompen todos los bloques (excepto irrompibles)
    const remaining = this.levelObj.blocks.filter((b) => !b.indestructible);
    if (remaining.length === 0) {
      this.level++;
      document.getElementById(
        "nivel-titulo"
      ).textContent = `BREAKOUT - NIVEL ${this.level}`;

      this.levelObj = new Level(this.level);

      this.ballSpeed += 30;
      this.ball.setSpeed(this.ballSpeed);
      this.paddle.setSpeed(7 + this.level * 0.5);

      this.ball.reset();
      this.paddle.reset();

      this.state = "nextLevel";
      this.levelMessageTimer = millis();
    }
    document.getElementById("score-text").textContent = `Puntos: ${this.score}`;
    this.updateLivesDisplay();
  }

  draw() {
    background(30);

    if (this.state === "paused") {
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text("PAUSADO", width / 2, height / 2);
      return;
    }

    if (this.state === "nextLevel") {
      this.drawLevelMessage();
      return;
    }

    this.paddle.draw();
    this.ball.draw();
    this.levelObj.draw();
  }

  drawLevelMessage() {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(`Nivel ${this.level}`, width / 2, height / 2);
  }

  keyPressed(keyCode) {
    if (keyCode === ESCAPE) {
      this.state = this.state === "paused" ? "playing" : "paused";
      return;
    }

    if (this.state !== "playing") return;

    if (keyCode === LEFT_ARROW) this.paddle.move(-1);
    if (keyCode === RIGHT_ARROW) this.paddle.move(1);
    if (key === " " && game.state === "playing") this.ball.launch();
  }

  updateLivesDisplay() {
    const container = document.getElementById("lives-container");
    container.innerHTML = ""; 

    for (let i = 0; i < this.lives; i++) {
      const heart = document.createElement("img");
      heart.src = "assets/images/heart.png";
      heart.className = "heart-icon";
      container.appendChild(heart);
    }
  }
}
