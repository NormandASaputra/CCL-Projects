let blood = [];
let cam;

function setup() {
    let canvas = createCanvas(windowWidth, 1000);
    canvas.parent("canvas-container");

    cam = createCapture(VIDEO, camReady);
    cam.hide();
    background(50);

    for (let i = 0; i < 300; i++) {
        blood[i] = new Blood(random(width), random(-200, 0));
    }
}

function camReady() {
    console.log("Ready!");
    image(cam, 0, 0, width, height); // 640 x 480
}

function draw() {

    for (let i = 0; i < blood.length; i++) {
        let b = blood[i]; // each object
        b.move();
        b.gravity();
        b.reappear();
        b.display();
    }
}

//

class Blood {
    constructor(x, y) {
        // properties (variables)
        this.x = x;
        this.y = y;
        this.xSpd = 0;
        this.ySpd = random(1.5, 2.5);
        this.dia = random(25, 40);
        this.r = random(50, 150);
        this.g = 0;
        this.b = 0;
        this.transparency = random(50)
    }

    // methods (functions)
    move() {
        this.x += this.xSpd;
        this.y += this.ySpd;
    }
    gravity() {
        let sinValue = sin(frameCount * 0.01) * 0.05;
        this.x += sinValue;
    }
    reappear() {
        if (this.x < 0) {
            this.x = width;
        }
        else if (this.x > width) {
            this.x = 0;
        }
        if (this.y < 0) {
            //this.x = height;
        }
        else if (this.y > height) {
            this.y = 0;
        }
    }
    display() {
        push();
        noStroke();
        fill(this.r, this.g, this.b, this.transparency);
        circle(this.x, this.y, this.dia);
        pop();
    }
}