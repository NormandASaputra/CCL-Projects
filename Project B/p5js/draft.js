let seq = 0; // initial scene
let phase = false;
let village;
let numSoldiers = 15;
let soldiers = [];
let fireworks = [];
let gravity;
let video;
let tanker;

function preload() {// loading of background image
    village1 = loadImage("images/village1.png")
    village = loadImage("images/village.png");
    city = loadImage("images/city.png")
}

function setup() {
    let canvas = createCanvas(1200, 700);
    canvas.parent("canvas-container");

    // construct the tank
    tanker = new Tank(650, 650);

    //generate soldiers
    for (let i = 0; i < numSoldiers; i++) {
        soldiers[i] = new Soldiers(random(width), random(0, 195));
    }
}

function draw() {
    background(255);

    if (seq == 0) {
        scene0();
    } else if (seq == 1) {
        scene1();
    } else if (seq == 2) {
        scene2();
    } else if (seq > 2) {
        scene0();
    }

}

// event listener (one frame!)
function proceedScene() {
    seq++;
}

function scene0() { //inital scene
    //display initial
    image(village1, 0, 0, 1200, 700)
}

function scene1() { // main scene
    // display of background
    image(village, 0, 0, 1200, 700);

    //spawn tank
    tanker.update(); // let's do something!
    tanker.display();

    // console for references
    if (mouseIsPressed) {
        let posX = mouseX;
        let posY = mouseY;
        console.log(posX, posY);
    }

    //rockets display
    push();
    colorMode(RGB);
    gravity = createVector(0, 0.1);
    stroke(255);
    strokeWeight(4);
    colorMode(RGB, 255, 255, 255, 1);


    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();

        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }
    }

    if (mouseIsPressed) { // rockets launch function + visual effects
        let firework = new Firework(mouseX);
        fireworks.push(firework);

        fill(228, 92, 41)
        circle(random(0, width), random(350, height), 15);
        fill(228, 92, 41)
        circle(random(0, width), random(350, height), 15)
        fill(253, 246, 82)
        circle(random(0, width), random(350, height), 15)
    }
    pop();

    for (let i = soldiers.length - 1; i >= 0; i--) {
        let s = soldiers[i];
        s.update();
        s.display();

        if (s.x > width || s.y > 600) {
            soldiers.splice(i, 1);
        }
    }

    if (soldiers.length < 15) {
        soldiers.push(new Soldiers(random(width), random(0, 195))); // heigh of wall 195
    }
}

function scene2() { // final scene
    //display initial
    image(city, 0, 0, 1200, 700)
}

class Soldiers {
    // constructor function
    constructor(startX, startY) {
        // properties: soldiers's characteristics
        this.x = startX;
        this.y = startY;
        this.xspeed = 0;
        this.yspeed = 0;
        this.dia = 10;
        this.colorgreen = random(47, 101);
    }
    //  soldiers's fall
    update() {
        // (add)
        this.x += this.xspeed;
        this.y += this.yspeed;

        this.xspeed = this.xspeed + random(-0.05, 0.05);
        this.yspeed = this.yspeed + random(0.01, 0.05);
    }
    display() {
        // soldier's appearance
        push();
        translate(this.x, this.y);
        strokeWeight(2);
        line(0, 0, -10, -18);
        //arm
        line(-10, -18, -26, -22);
        line(-10, -18, 10, -18);
        //leg
        line(0, 0, 14, 28);
        line(0, 0, 15, 4);
        line(15, 4, 22, 15);
        //Parachute
        line(-10, -20, -30, -90);
        line(-10, -20, -5, -90);
        line(-10, -20, 20, -100);
        fill(237, 230, 205);
        quad(40, -95, -60, -80, -50, -100, 20, -110);

        fill(0, this.colorgreen, 0);
        circle(-10, -25, this.dia);
        pop();
    }
}

class Firework {
    constructor(x) {
        this.firework = new Particle(x, height, true);
        this.exploded = false;
        this.particles = [];
    }

    done() {
        if (this.exploded && this.particles.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    update() {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();

            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(gravity);
            this.particles[i].update();

            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    }

    explode() {
        for (let i = 0; i < 100; i++) {
            let p = new Particle(this.firework.pos.x, this.firework.pos.y, false);
            this.particles.push(p);
        }
    }

    show() {
        if (!this.exploded) {
            this.firework.show();
        }

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }
}

// Particle class
class Particle {
    constructor(x, y, firework) {
        this.pos = createVector(x, y);
        this.firework = firework;
        this.lifespan = 255;

        if (this.firework) {
            this.vel = createVector(0, random(-12, -8));
        } else {
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(2, 10));
        }

        this.acc = createVector(0, 0);
        this.color = color(random(210, 270), random(80, 246), random(35, 95));
    }

    done() {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        if (!this.firework) {
            this.vel.mult(0.9);
            this.lifespan -= 4;
        }

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        colorMode(RGB);

        if (!this.firework) {
            strokeWeight(2);
            stroke(this.color, this.lifespan);
        } else {
            strokeWeight(4);
            stroke(this.color);
        }

        point(this.pos.x, this.pos.y);
    }
}

class Tank {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.yspeed = random(0.5, 1)
    }
    update() {
        // update properties here to achieve
        // your dancer's desired moves and behaviour
        if (mouseIsPressed) {
            let posX = mouseX - this.x;
            let posY = mouseY - this.y;
            console.log(posX, posY);
        }

        this.y = this.y * 1 + this.yspeed;

        if (this.y > 350 || this.y < 200) {
            this.yspeed = this.yspeed * -1
        }
    }
    display() {

        push();
        translate(this.x, this.y);

        this.canon(-75, -62.5);
        this.canonAngle = 0
        this.tankmain();
        this.flag();
        this.middleWheels(-10, 8);
        this.middleWheels(12, 8);
        this.middleWheels(-60, 3.5);
        this.middleWheels(-40, 6.5);
        this.middleWheels(60, 3.5);
        this.middleWheels(40, 6.5);
        this.outerWheels(-80, 0);
        this.outerWheels(80, 0);

        pop();
    }

    tankmain() {
        push();
        noStroke();
        //lower body of the tank
        fill(255);
        triangle(-47, -9, -69, -9.5, -50, -43);
        triangle(40, -42, 39, -14.5, 75, -8.5);
        rect(-50, -41.5, 90, 30);
        //head of tank
        fill(141, 149, 123);
        rect(-40, -75, 70, 33, 20, 20, 0, 0);
        //eyes of tank
        fill(0);
        circle(-26, -63, 15);
        fill(255);
        circle(-26, -63, 5);
        //mouth
        fill(10, 32, 101);
        rect(-40, -48.5, 25, 2);
        pop();

        fill(42, 45, 34);
        ellipse(0, 0, 180, 35);
    }
    middleWheels(wx, wy) {
        fill(17, 21, 19);
        circle(wx, wy, 20);
        fill(72, 61, 50);
        circle(wx, wy, 5);
    }
    outerWheels(ox, oy) {
        fill(17, 21, 19);
        circle(ox, oy, 15);
        fill(72, 61, 50);
        circle(ox, oy, 5);
    }
    canon(cx, cy) {
        push()
        translate(cx + 35, cy)
        this.canonAngle = map(sin(frameCount * 0.02), -1, 1, -0.5, 0.5)
        rotate(this.canonAngle)
        noStroke();
        fill(187, 39, 26);
        rect(5, 0, -40, 7);
        fill(249, 217, 73);
        rect(cx + 49, cy + 62.5, 3, 7)
        rect(cx + 45, cy + 62.5, 3, 7)
        if (this.y > 200 || this.y < 200) {
            fill(228, 92, 41)
            circle(random(-75, 87.5), random(-50, 65), 15);
            fill(228, 92, 41)
            circle(random(-75, 87.5), random(-50, 65), 15);
            fill(253, 246, 82)
            circle(random(-75, 87.5), random(-50, 65), 15)
        }
        pop()
    }
    flag() {
        // make england flag on the body
        fill(183, 53, 43);
        noStroke();
        rect(-57, -32, 108, 10);
        rect(-15, -42, 20, 25);
        triangle(51, -21.5, 62, -21.5, 51, -30.5);
        triangle(-57, -31, -57, -22.5, -62, -22.5);
    }

}
