const flowCanvas = document.getElementById('flowCanvas');
const ctx = flowCanvas.getContext('2d');

let mouse = {x: undefined, y : undefined};
const colors = ['#732658', '#6683D9', '#049DD9', '#05DBF2', '#05F2F2'];

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Particle(x, y, radius, color) {
    console.log(x, y);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromInterval(50, 140);
    this.lastMouse = {x: x, y : y};
    this.draw = function(lastPoint) {
        
        ctx.beginPath();

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;

        ctx.moveTo(lastPoint.x, lastPoint.y);

        ctx.lineTo(this.x, this.y);

        ctx.stroke();

        ctx.closePath();

    };

    this.update = function() {

        const lastPoint = {x: this.x, y: this.y};

        this.radians += this.velocity;

        if(mouse.x && mouse.y) {
            this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
            this.lastMouse.y += (mouse.y- this.lastMouse.y) * 0.05;
        }

        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    }

};

let particles = [];

function init() {

    particles = [];

    for(let i = 0; i < 100; i++) {

        const radius = (Math.random() * 4) + 1.5;
        const particle = new Particle(window.innerWidth / 2, window.innerHeight / 2, radius, colors[Math.floor(Math.random() * colors.length)]);

        particles.push(particle);

    };

    console.log(particles);
};

function recMouse(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse);
    // if(particles.length === 0) init();
};

document.addEventListener('mousemove', recMouse);

(function () {
    flowCanvas.width = window.innerWidth;
    flowCanvas.height = window.innerHeight;
    init();
    requestAnimationFrame(animate);

})();

function animate() {
    
    requestAnimationFrame(animate);

    ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
    ctx.fillRect(0, 0, flowCanvas.width, flowCanvas.height);

    particles.forEach(particle => particle.update());

};

