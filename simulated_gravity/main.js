const flowCanvas = document.getElementById('flowCanvas');
const ctx = flowCanvas.getContext('2d');

const gravity = 1.2;

/* Circle Constructor Function */
function Ball(x, y, dx, velocity, radius, color) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.velocity = this.radius * velocity * 0.15;
    
    this.draw = function() {
        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        ctx.fillStyle = this.color;

        ctx.fill();

        ctx.stroke();

        ctx.closePath();
    };

    this.update = function() {

        if(this.y + this.radius + this.velocity > window.innerHeight) {
            this.velocity *= 0.925;
            this.velocity = -this.velocity;
            this.dx *= 0.95;
        }
        else this.velocity += gravity;

        if(this.x + this.radius > window.innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx * 0.95;
        } 
        
        this.x += this.dx;
        this.y += this.velocity;

        this.draw();
    };
};

/* Generate Circles to be rendered to The Screen */
let circleArr = [];
let colors = ['#f05c46', '#9c78f0', '#454545', '#2a918e', '#30cf4a', '#cfcfcf', '#a6a60c'];

function init() {

    circleArr = [];

    for(let i = 0; i < 100; i++) {

        let radius = Math.floor(Math.random() * 40) + 15;
        let x = (Math.random() * (window.innerWidth - radius * 2)) + radius;
        let y = (Math.random() * (window.innerHeight - radius * 2)) + radius;
        let dx = (Math.random() - 0.5) * 8;
        let velocity = Math.random() * 4;
        
        let color = colors[Math.floor(Math.random() * colors.length)];
    
        const circle = new Ball(x, y, dx, velocity, radius, color);
    
        circleArr.push(circle);
    };

};

window.addEventListener('click', init);

(function () {
    flowCanvas.width = window.innerWidth;
    flowCanvas.height = window.innerHeight;
    init();
    requestAnimationFrame(animate);

})();

function animate() {
    
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, flowCanvas.width, flowCanvas.height);

    circleArr.forEach(circle => circle.update());

};

