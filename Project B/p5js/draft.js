let x;
let y;
function setup() {
    createCanvas(400, 400);
    background(220);
}

function draw() {

    x = mouseX
    y = mouseY
    if (mouseIsPressed) {
        fill(random(255), random(255), random(255))
        rect(mouseX - 25, mouseY - 35, 50, 70)
    }
}