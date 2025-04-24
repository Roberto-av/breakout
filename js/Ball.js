class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height - 60;
    this.r = 10;
    this.speed = 5;
    this.dx = random([-1, 1]);
    this.dy = -1;
    this.moving = false;
  }

  launch() {
    this.moving = true;
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  update(paddle, blocks, game) {
    if (!this.moving) return;

    // Guardamos posición anterior
    const prevX = this.x;
    const prevY = this.y;

    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;

    // Rebotar con paredes
    if (this.x < this.r || this.x > width - this.r) this.dx *= -1;
    if (this.y < this.r) this.dy *= -1;

    // Rebote con paddle
    if (
      this.y + this.r > paddle.y &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.dy > 0
    ) {
      this.dy *= -1;
      this.y = paddle.y - this.r;
    }

    // Rebote con bloques (detectando desde dónde vino)
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];

      if (
        circleRectCollision(
          this.x,
          this.y,
          this.r,
          block.x,
          block.y,
          block.w,
          block.h
        )
      ) {
        // Reducir el contador de golpes del bloque
        if (block.indestructible) {
        } else {
          block.hitsCount--;
          if (block.hitsCount <= 0) {
            blocks.splice(i, 1);
            game.score++;
          }
        }

        // Detectamos el lado desde el que la pelota ha colisionado
        const cameFromLeft = prevX < block.x;
        const cameFromRight = prevX > block.x + block.w;
        const cameFromTop = prevY < block.y;
        const cameFromBottom = prevY > block.y + block.h;

        // Rebote de la pelota dependiendo de la colisión
        if ((cameFromLeft && this.dx > 0) || (cameFromRight && this.dx < 0)) {
          this.dx *= -1;
        } else if (
          (cameFromTop && this.dy > 0) ||
          (cameFromBottom && this.dy < 0)
        ) {
          this.dy *= -1;
        } else {
          this.dy *= -1; // fallback
        }

        break; // solo una colisión por frame
      }
    }

    // Pierde vida
    if (this.y > height) {
      game.lives--;
      this.reset();
    }
  }

  draw() {
    fill(255, 200, 0);
    ellipse(this.x, this.y, this.r * 2);
  }
}

function circleRectCollision(cx, cy, radius, rx, ry, rw, rh) {
  let closestX = constrain(cx, rx, rx + rw);
  let closestY = constrain(cy, ry, ry + rh);
  let dx = cx - closestX;
  let dy = cy - closestY;
  return dx * dx + dy * dy <= radius * radius;
}
