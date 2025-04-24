class Paddle {
  constructor() {
    this.width = 100;
    this.height = 20;
    this.x = width / 2 - this.width / 2;
    this.y = height - 40;
    this.speed = 7;
  }

  reset() {
    this.w = 100;
    this.h = 20;
    this.x = width / 2 - this.w / 2;
    this.y = height - 30;
  }

  move(dir) {
    this.x += dir * this.speed;
    this.x = constrain(this.x, 0, width - this.width);
  }

  draw() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }
}
