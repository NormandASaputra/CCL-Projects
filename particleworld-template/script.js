let particles = []; // empty array
function setup() {
  let canvas = createCanvas(1000, 1000);
  canvas.parent("canvasWrapper");

}

function draw() {
  background(220);
  assaultR(mouseX, mouseY);
  if (mouseIsPressed) {
    let posX = mouseX;
    let posY = mouseY;
    console.log(posX, posY);
  }
  man(875, 428, 739, 428);

  //floor
  push();
  fill(0, 255, 0)
  noStroke();
  rect(0, 700, 1000, 300)
  fill(133, 87, 35)
  rect(0, 720, 1000, 300)
  pop();

  //generate
  particles.push(new Particle(mouseX, mouseY, random(10, 25), random(5, 15)));
  particles.push(new Particle2(789, mouseY, random(10, 25), random(5, 15)));

  //update and display
  if (mouseIsPressed) {
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i]; // access each item!
      p.move();
      p.display();
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (p.isDone == true) {
      particles.splice(i, 1);
    }
  }

  // limit the number of the particles!
  while (particles.length > 200) {
    particles.splice(0, 1);
  }

}

function assaultR(ax, ay) {
  push();
  noStroke();
  fill(66, 68, 74)
  rect(ax - 80, ay - 10, 70, 15)
  fill(82, 85, 88)
  rect(ax - 89, ay, 10, 35)
  fill(82, 85, 88)
  triangle(ax - 115, ay - 12, ax - 112, ay - 32, ax - 95, ay - 19)
  fill(125, 82, 45)
  rect(ax - 258, ay - 20, 77, 30, 10, 0, 0, 0)
  triangle(ax - 258, ay + 10, ax - 255, ay + 31, ax - 178, ay + 10)
  fill(145, 147, 147)
  rect(ax - 181, ay - 20, 110, 30, 0, 15, 0, 0)
  circle(ax, ay, 25)
  pop();


}

function man(Rx1, Ry1, Rx2, Ry2) {
  fill(266, 168, 152)
  circle(803, 300, 125)//face
  push();
  fill(0)
  ellipse(774, 277, 25, 10)//eyes
  ellipse(840, 277, 25, 10)
  fill(255, 0, 0)
  ellipse(804, 319, 40, 60)//mouth
  pop();
  ellipse(805, 506, 180, 290)
  push();
  translate(Rx1, Ry2)
  ellipse(0, 50, 50, 150)//right hand
  rotate(PI / 3)
  pop();
  push();
  translate(Rx2, Ry2)//body
  ellipse(0, 50, 50, 150)
  pop();

}
class Particle {//bullets
  // very special constructor function!
  constructor(startX, startY, Dia1, Dia2) {
    // properties (variables)
    this.x = startX;
    this.y = startY;
    this.xSpeed = random(1, 10);
    this.ySpeed = random(-2, 2);
    this.diaw = Dia1;
    this.diah = Dia2;
    this.isDone = false;
  }
  // methods (functions)
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  checkEdges() {
    if (this.x < 0 || this.x > width) {
      this.isDone = true;
    }
    if (this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  display() {
    push();
    noStroke();
    fill(random(255), random(255), random(255));
    ellipse(this.x, this.y, this.diaw, this.diah);
    pop();
  }
}

class Particle2 {//blood
  // very special constructor function!
  constructor(startX, startY, Dia1, Dia2) {
    // properties (variables)
    this.x = startX;
    this.y = startY;
    this.xSpeed = random(1, 7);
    this.ySpeed = random(-1, 3);
    this.diaw = Dia1;
    this.diah = Dia2;
    this.isDone = false;
  }
  // methods (functions)
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  checkEdges() {
    if (this.x < 0 || this.x > width) {
      this.isDone = true;
    }
    if (this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  noblood() {
    if (y > 650 || y < 240) {
      //does not appear
    }
  }
  display() {
    push();
    noStroke();
    fill(138, 3, 3);
    ellipse(this.x, this.y, this.diaw, this.diah);
    pop();
  }
}






// make particles to show the gun bullets going away
// ellipse
// colour ??
// movement randomn to the plus X and plus/minus Y

// make a random stickman, on the right
// use ellipse and circle
// when it get hits the elllipse turn red from green?


// gun to rotate
//hand to rotate