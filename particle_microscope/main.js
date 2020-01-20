const flowCanvas = document.getElementById('flowCanvas');
const ctx = flowCanvas.getContext('2d');
const maxRadius = 40;

/* Circle Constructor Function */
function Circle(x, y, dx, dy, radius, color) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.initRadius = radius;
    this.color = color;
    

    this.draw = function() {
        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        ctx.fillStyle = this.color;

        ctx.fill();
    };

    this.update = function() {
        if(this.x + this.radius > flowCanvas.width || this.x - this.radius < 0) this.dx = -this.dx;

        if(this.y + this.radius > flowCanvas.height || this.y - this.radius < 0) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x && mouse.y && mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius <= maxRadius) this.radius += 1;
            
        } else if(this.radius > this.initRadius) {
            this.radius -= 1;
        }

        this.draw();
    };
};
/* Generate Circles to be rendered to The Screen */
let circleArr = [];
let mouse = {x : undefined, y : undefined};
let colors = ['#f05c46', '#9c78f0', '#454545', '#2a918e', '#30cf4a', '#cfcfcf', '#a6a60c'];

for(let i = 0; i < 600; i++) {

    let radius = (Math.random() * 10) + 1;
    let x = (Math.random() * (window.innerWidth - radius * 2)) + radius;
    let y = (Math.random() * (window.innerHeight - radius * 2)) + radius;
    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;
    let rand1 = Math.random() * 255;
    let rand2 = Math.random() * 255;
    let rand3 = Math.random() * 255;
    

    let color = `rgba(${rand1}, ${rand2}, ${rand3}, 1)`;

    const circle = new Circle(x, y, dx, dy, radius, color);

    circleArr.push(circle);
}

/* Animate Function, initially called within the init function */
function animate() {

    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, flowCanvas.width, flowCanvas.height);

    circleArr.forEach(circle => circle.update());

};

(function init() {
    flowCanvas.width = window.innerWidth;
    flowCanvas.height = window.innerHeight;
    requestAnimationFrame(animate);
})();

function zoom(e) {
    mouse.x = e.x;
    mouse.y = e.y;
};

window.addEventListener('mousemove', zoom);

// function drawScribbledLine(ctx, x, y) {
    
// };

// if(flowCanvas.getContext) {

//     for(let i = 50; i < flowCanvas.width - 20; i += 40) {

//         const rand = Math.floor(Math.random() * (flowCanvas.height - 20)) + 1;

//         ctx.fillStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.random()})`;

//         ctx.fillRect(i, rand, 30, 30);

//     };
// };


