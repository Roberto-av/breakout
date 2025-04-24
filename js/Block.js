class Block {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hitsCount = 1;
    this.indestructible = false;
    this.color = color(0, 200, 255); //  (azul)
  }

  draw() {
    if (this.indestructible) {
      let blink = sin(frameCount * 0.1) * 50 + 150;
      fill(blink); 
    } else {
      fill(this.color);
    }
    rect(this.x, this.y, this.w, this.h);
  }

  hits(ball) {
    // Si la pelota choca, restamos un golpe
    if (
      ball.x > this.x &&
      ball.x < this.x + this.w &&
      ball.y - ball.r < this.y + this.h &&
      ball.y + ball.r > this.y
    ) {
      this.hitsCount--;

      // Si ya no tiene golpes restantes, lo destruimos
      if (this.hitsCount <= 0) {
        return true;
      }
    }
    return false;
  }
}
