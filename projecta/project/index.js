let phase = false;

let xPetal = [254, 366, 410, 312, 222]; //initial x-coordinates of the petal
let yPetal = [197, 210, 322, 412, 220]; //initial y-coordinates of the petal
let dia = 50; // diameter of smallest flower circle
let r = 165;
let g = 85;
let b = 95;

let flyRotFreq = [];
let flyRadFreq = [];

function setup() {
    createCanvas(600, 600);

    flyRotFreq[0] = random(0.02, 0.03);
    flyRotFreq[1] = random(0.02, 0.03);

    flyRadFreq[0] = random(0.01, 0.03);
    flyRadFreq[1] = random(0.01, 0.03);

    strokeWeight(3);
    color(0);
    line(150, 0, 150, 600);

}

function draw() {
    circle(width / 2, height / 2, 50);
    if (phase == false) {
        background(165, 144, 143);
    } else {
        background(87, 110, 35);
    }

    //flower phase display
    if (phase == false) {
        petal1(xPetal[0], yPetal[0]);
        petal2(xPetal[1], yPetal[1]);
        petal3(xPetal[2], yPetal[2]);
        petal4(xPetal[3], yPetal[3]);
        petal5(xPetal[4], yPetal[4]);
        flower(width / 2, height / 2, dia, dia);
    } else {
        flower2(width / 2, height / 2, 130, 150, 7, 0.07);//middle
        flower2(100, 100, 130, 150, 7, 0.05);//top left
        flower2(500, 100, 130, 150, 7, 0.09);//top right
        flower2(100, 500, 130, 150, 7, 0.05);//bottom left
        flower2(500, 500, 130, 150, 7, 0.03);//bottom right
        flower(width / 2, height / 2, dia, dia);
    }

    //interactions
    checkKeyIsPressed();

    //display
    //text on canvas
    if (phase == false) {
        push();
        stroke(0);
        strokeWeight(2);
        textSize(30);
        fill(0, 255, 0, 85);
        text("interact to let it reproduce", 140, 30);
        textSize(15);
        strokeWeight(1);
        fill(0, 230, 0, 60);
        text("Use WASDZ or Press Mouse to interact", 175, 550);
        pop();
    } else {
        push();
        stroke(0);
        strokeWeight(2);
        textSize(30);
        fill(200, 0, 0, 85);
        text("It has reproduced", 200, 30);
        textSize(25);
        strokeWeight(2);
        fill(200, 0, 0, 85);
        text("USE MOUSE", 220, 550);
        pop();
    }

    //leaves around
    // leaves(105,2)
    // 2 flies for raffles flower
    fly(mouseX, mouseY, flyRotFreq[0], flyRadFreq[0]);
    fly(mouseX, mouseY, flyRotFreq[1], flyRadFreq[1]);
}



function fly(originX, originY, rotFreq, radFreq) {
    push();
    translate(originX, originY);

    let radDist = map(noise(frameCount * radFreq), 0, 1, -100, 100);
    let x = cos(frameCount * rotFreq) * radDist;
    let y = sin(frameCount * rotFreq) * radDist;
    translate(x, y);
    if (phase == false) {
        stroke(0);
        fill(0);
        ellipse(0, 0, 10, 10); //head of fly
        ellipse(0, 15, 7, 20); //body of fly
        fill(0, 255, 0);
        ellipse(3, 0, 3, 5); //right eye
        fill(0, 255, 0);
        ellipse(-3, 0, 3, 5); //left eye
        stroke(0);
        fill(255);
        rotate(PI / 6);
        ellipse(-8, 8, 15, 5); //wings of fly
        rotate(PI / 6);
        ellipse(8, 8, 15, 5); //wings of fly
    } else {
        //creation of bee
        stroke(0);
        fill(0);
        ellipse(0, 0, 10, 10); //head of bee
        fill(255, 176, 0);
        ellipse(0, 15, 7, 20); //body of bee
        fill(0, 255, 0);
        ellipse(3, 0, 3, 5); //right eye
        fill(0, 255, 0);
        ellipse(-3, 0, 3, 5); //left eye
        stroke(0);
        fill(255);
        rotate(PI / 6);
        ellipse(-8, 8, 15, 5); //wings of bee
        rotate(PI / 6);
        ellipse(8, 8, 15, 5); //wings of bee
    }

    pop();
}

// initial image of the flower
//the middle part of the raffles flower
function flower(x, y, dia, dia) {
    stroke(0);
    strokeWeight(2);
    if (phase == false) {
        fill(r, g, b);
        ellipse(x, y, dia + 175, dia + 175); //outer circle
        noStroke();
        fill(r - 121, g - 77, b - 87, 180);
        ellipse(x, y, dia + 80, dia + 80); //middle circle
        noStroke();
        fill(r + 75, g + 62, b + 29);
        ellipse(x, y, dia + 50, dia + 50); //inner circle
    } else {
        // make the circles become yellow for melati
        // middle flower
        noStroke();
        fill(222, 203, 104, 150);
        circle(width / 2, height / 2, dia + 100);
        noStroke();
        fill(201, 87, 39, 200);
        circle(width / 2, height / 2, dia + 35);
        //top right flower
        noStroke();
        fill(222, 203, 104, 150);
        circle(500, 100, dia + 100);
        noStroke();
        fill(201, 87, 39, 200);
        circle(500, 100, dia + 35);
        //top left flower
        noStroke();
        fill(222, 203, 104, 150);
        circle(100, 100, dia + 100);
        noStroke();
        fill(201, 87, 39, 200);
        circle(100, 100, dia + 35);
        // bottom left flower
        noStroke();
        fill(222, 203, 104, 150);
        circle(100, 500, dia + 100);
        noStroke();
        fill(201, 87, 39, 200);
        circle(100, 500, dia + 35);
        //bottom right flower
        noStroke();
        fill(222, 203, 104, 150);
        circle(500, 500, dia + 100);
        noStroke();
        fill(201, 87, 39, 200);
        circle(500, 500, dia + 35);
    }
}

// 5 petals
function petal1(x, y) {
    push();
    let red = 162;
    let green = 47;
    let blue = 46;
    stroke(0);
    strokeWeight(2);
    fill(red, green, blue);
    // r = map(a,300,600,0,255)// make the colour to melati white
    translate(x, y);

    let angle = sin(frameCount * 0.07) * 0.01;
    rotate(angle);

    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-66, -81);
    curveVertex(43, -123);
    curveVertex(145, -76);
    curveVertex(99, 4);
    curveVertex(99, 4);
    endShape();

    //random dots on the petals
    fill(255);
    ellipse(12, -79, 15, 7);
    ellipse(38, -108, 15, 7);
    ellipse(134, -69, 15, 7);
    ellipse(-56, -77, 15, 7);
    ellipse(-3, -35, 15, 7);
    ellipse(75, -36, 15, 7);
    ellipse(52, -66, 15, 7);
    ellipse(106, -19, 15, 7);
    ellipse(45, -21, 15, 7);
    ellipse(81, -90, 15, 7);
    ellipse(94, -58, 15, 7);
    ellipse(112, -45, 15, 7);
    ellipse(17, -46, 15, 7);
    ellipse(-27, -58, 15, 7);
    ellipse(-15, -103, 15, 7);
    ellipse(10, -17, 15, 7);
    ellipse(54, -45, 15, 7);
    ellipse(83, -17, 15, 7);
    ellipse(106, -77, 15, 7);
    ellipse(46, -89, 15, 7);
    ellipse(-20, -81, 15, 7);
    ellipse(3, -61, 15, 7);
    ellipse(10, -99, 15, 7);
    ellipse(73, -107, 15, 7);
    ellipse(112, -93, 15, 7);
    ellipse(77, -70, 15, 7);
    pop();
}
function petal2(x, y) {
    push();
    translate(x, y);
    let angle = sin(frameCount * 0.11) * 0.01;
    rotate(angle);
    stroke(0);
    strokeWeight(2);
    fill(162, 47, 46);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(0 + 56, 0 - 79);
    curveVertex(0 + 150, 0 - 10);
    curveVertex(0 + 140, 0 + 94);
    curveVertex(0 + 44, 0 + 75);
    curveVertex(0 + 44, 0 + 75);
    endShape();

    //random dots on the petal
    fill(255);
    ellipse(21, -8, 15, 7);
    ellipse(40, -51, 15, 7);
    ellipse(40, -20, 15, 7);
    ellipse(88, -27, 15, 7);
    ellipse(88, 16, 15, 7);
    ellipse(58, 33, 15, 7);
    ellipse(58, 55, 15, 7);
    ellipse(102, 57, 15, 7);
    ellipse(139, -6, 15, 7);
    ellipse(129, 76, 15, 7);
    ellipse(99, 37, 15, 7);
    ellipse(65, -5, 15, 7);
    ellipse(136, 51, 15, 7);
    ellipse(137, 21, 15, 7);
    ellipse(76, -54, 15, 7);
    ellipse(42, 13, 15, 7);
    ellipse(108, 4, 15, 7);
    ellipse(112, -37, 15, 7);
    ellipse(78, 71, 15, 7);
    ellipse(107, 82, 15, 7);
    ellipse(61, -30, 15, 7);
    ellipse(114, -15, 15, 7);
    ellipse(56, -68, 15, 7);
    ellipse(117, 33, 15, 7);
    ellipse(89, -8, 15, 7);
    ellipse(77, 48, 15, 7);

    pop();
}
function petal3(x, y) {
    push();
    translate(x, y);
    let angle = sin(frameCount * 0.11) * 0.01;
    rotate(angle);
    stroke(0);
    strokeWeight(2);
    fill(162, 47, 46);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(+87, +5);
    curveVertex(+67, +107);
    curveVertex(-33, +143);
    curveVertex(-63, +80);
    curveVertex(-63, +80);
    endShape();

    //random dots on petal
    fill(255);
    ellipse(-9, 62, 15, 7);
    ellipse(8, 40, 15, 7);
    ellipse(21, 13, 15, 7);
    ellipse(72, 17, 15, 7);
    ellipse(67, 96, 15, 7);
    ellipse(-29, 128, 15, 7);
    ellipse(-31, 91, 15, 7);
    ellipse(15, 91, 15, 7);
    ellipse(39, 66, 15, 7);
    ellipse(50, 38, 15, 7);
    ellipse(76, 61, 15, 7);
    ellipse(10, 124, 15, 7);
    ellipse(35, 113, 15, 7);
    ellipse(-10, 108, 15, 7);
    ellipse(43, 89, 15, 7);
    ellipse(45, 21, 15, 7);
    ellipse(12, 72, 15, 7);
    ellipse(29, 51, 15, 7);
    ellipse(64, 78, 15, 7);
    ellipse(75, 43, 15, 7);
    ellipse(-8, 89, 15, 7);
    ellipse(-40, 112, 15, 7);
    pop();
}
function petal4(x, y) {
    push();
    translate(x, y);
    let angle = sin(frameCount * 0.11) * 0.01;
    rotate(angle);
    stroke(0);
    strokeWeight(2);
    fill(162, 47, 46);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(+3, +48);
    curveVertex(-114, +49);
    curveVertex(-169, -30);
    curveVertex(-112, -60);
    curveVertex(-112, -60);
    endShape();

    //random dots on petals
    fill(255);
    ellipse(-115, -42, 15, 7);
    ellipse(-154, -23, 15, 7);
    ellipse(-125, 25, 15, 7);
    ellipse(-88, -16, 15, 7);
    ellipse(-88, 41, 15, 7);
    ellipse(-41, 7, 15, 7);
    ellipse(-31, 42, 15, 7);
    ellipse(2, 39, 15, 7);
    ellipse(-4, 20, 15, 7);
    ellipse(-120, -12, 15, 7);
    ellipse(-90, 15, 15, 7);
    ellipse(-64, -2, 15, 7);
    ellipse(-56, 21, 15, 7);
    ellipse(-59, 50, 15, 7);
    ellipse(-142, -40, 15, 7);
    ellipse(-139, 6, 15, 7);
    ellipse(-29, 25, 15, 7);
    ellipse(-110, 2, 15, 7);
    ellipse(-131, -26, 15, 7);
    ellipse(-104, -27, 15, 7);
    ellipse(-114, 38, 15, 7);
    ellipse(-68, 31, 15, 7);
    ellipse(-149, -8, 15, 7);
    pop();
}
function petal5(x, y) {
    push();
    translate(x, y);
    let angle = sin(frameCount * 0.11) * 0.01;
    rotate(angle);
    stroke(0);
    strokeWeight(2);
    fill(162, 47, 46);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-48, -80);
    curveVertex(-113, +9);
    curveVertex(-85, +135);
    curveVertex(-33, +99);
    curveVertex(-33, +99);
    endShape();

    //random petals on the petal
    fill(255);
    ellipse(-74, 127, 15, 7);
    ellipse(-47, -66, 15, 7);
    ellipse(-73, -38, 15, 7);
    ellipse(-101, 7, 15, 7);
    ellipse(-100, 52, 15, 7);
    ellipse(-89, 97, 15, 7);
    ellipse(-90, 76, 15, 7);
    ellipse(-45, 84, 15, 7);
    ellipse(-42, 43, 15, 7);
    ellipse(-20, 6, 15, 7);
    ellipse(-56, -7, 15, 7);
    ellipse(-59, 33, 15, 7);
    ellipse(-65, 75, 15, 7);
    ellipse(-63, 107, 15, 7);
    ellipse(-64, 55, 15, 7);
    ellipse(-107, 33, 15, 7);
    ellipse(-74, 8, 15, 7);
    ellipse(-47, 16, 15, 7);
    ellipse(-85, -15, 15, 7);
    ellipse(-43, -30, 15, 7);
    ellipse(-36, -45, 15, 7);
    ellipse(-26, -16, 15, 7);
    ellipse(-85, 38, 15, 7);
    pop();
}

// manual interaction functions
//petal movements
function checkKeyIsPressed() {
    if (keyIsPressed) {
        if (key == "w") {
            // move top petal
            xPetal[0] = xPetal[0] - random(3, 6);
            yPetal[0] = yPetal[0] - random(3, 6);
        } else if (key == "d") {
            // move right petal
            xPetal[1] = xPetal[1] + random(1, 3);
            yPetal[1] = yPetal[1] - random(1, 3);
        } else if (key == "s") {
            //move bottom 2 petal
            xPetal[2] = xPetal[2] + random(1, 3);
            yPetal[2] = yPetal[2] + random(1, 3);
            xPetal[3] = xPetal[3];
            yPetal[3] = yPetal[3] + random(1, 3);
        } else if (key == "a") {
            //move left petal
            xPetal[4] = xPetal[4] - random(1, 3);
            yPetal[4] = yPetal[4];
        } else if (key == "z") {
            //reverse movement of all petals
            xPetal[0] = xPetal[0] + 3;
            yPetal[0] = yPetal[0] + 3;

            xPetal[1] = xPetal[1] - 3;
            yPetal[1] = yPetal[1] + 3;

            xPetal[2] = xPetal[2] - 3;
            yPetal[2] = yPetal[2] - 3;
            xPetal[3] = xPetal[3];
            yPetal[3] = yPetal[3] - 3;

            xPetal[4] = xPetal[4] + 3;
            yPetal[4] = yPetal[4];
        }
    }
}

//reproduction of the flower code

// Event from p5
function mousePressed() {
    let distance = dist(mouseX, mouseY, width / 2, height / 2);
    if (distance < (dia + 50) / 2) {
        // in!
        //console.log("in");
        phase = true;
    } else {
        // out
        //console.log("out");
    }
}

function flower2(x, y, min, max, ang, fc) {
    push();
    translate(x, y);
    // noStroke();
    fill(255);
    beginShape();
    for (let angle = 0; angle < 360; angle += 10) {
        let freq = radians(angle) * ang + frameCount * fc;
        let radDist = map(sin(freq), -1, 1, min, max);
        let x = cos(radians(angle)) * radDist;
        let y = sin(radians(angle)) * radDist;

        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
}
