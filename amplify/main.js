const flowCanvas = document.getElementById('flowCanvas');
const ctx = flowCanvas.getContext('2d');

let mouse = {x : undefined, y : undefined};
let maxHeight = 290;
let minHeight = 25;
let gravity = 0.025;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function AmplifyRect(x, y, width, height, dy, r, g, b) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dy = dy;
    this.r = r;
    this.g = g;
    this.b = b;
    this.updateColor = 1;
    this.positionFromMouse = {x : undefined, y : undefined};
    
    this.draw = function() {
        
        ctx.beginPath();

        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, 1)`;
        ctx.strokeStyle = `rgba(${this.g}, ${this.r}, ${this.b}, 1)`;

        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.stroke();
        
        if(Math.sign(this.dy) === 1) {
            const gradient = ctx.createLinearGradient(this.x, window.innerHeight + this.height, this.width, -25);
            gradient.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, 0.02)`);    
            gradient.addColorStop(1, `rgba(${this.r}, ${this.g}, ${this.b}, 0.07)`);
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x, window.innerHeight + this.height, this.width, -40);

        }

    };

    this.calcPositionFromMouse = function() {
        this.positionFromMouse.x = mouse.x - this.x;
        this.positionFromMouse.y = (window.innerHeight + this.height) - mouse.y;
    };

    this.update = function() {

        this.calcPositionFromMouse();
        //dynamically calc new position of rect if mouse position is over rect
        if(this.positionFromMouse.x < this.width && this.positionFromMouse.x > 0 && mouse.y !== 0) {
            maxHeight = Math.abs(window.innerHeight - mouse.y);
            this.height += this.dy * 2.15;
        } else if((this.positionFromMouse.x < this.width * 2 && this.positionFromMouse.x > - this.width) && mouse.y !== 0) {
            maxHeight = Math.abs(window.innerHeight - mouse.y);
            this.height += this.dy * 1.20;
        } 
        else {
            maxHeight = 290;
        }

        //change color (same logic for r and b, if needed)
        if(this.g > 255) this.updateColor = - this.updateColor;
        else if(this.g < 0) this.updateColor = Math.abs(this.updateColor);

        this.g += this.updateColor;
        
        //change velocity direction
        if(this.height - this.dy < -(maxHeight)) this.dy = Math.abs(this.dy);
        else if(this.height + this.dy > -(minHeight)) this.dy = - this.dy;
        else {
            //add acceleration on downfall (this.dy is positive); add friction when rising (this.dy is negative)
            if(Math.sign(this.dy) === -1) this.dy *= 0.99;
            else if(Math.sign(this.dy) === 1) this.dy += gravity;
        }
        this.height += this.dy;

        this.draw();
    }

};

function init() {

    rectArr = [];

    const rectWidth = 90;
    const colorMultiplier = randomIntFromInterval(7, 55);
    let j = 0;

    for(let i = 0; i < window.innerWidth; i+= rectWidth) {
        let rectHeight = randomIntFromInterval(minHeight * 4, maxHeight); 
        let dy = 2.25;
        let r = Math.floor(255 - j * colorMultiplier);
        let g = Math.floor(255 - j * colorMultiplier);
        let b = 235;

        let rect = new AmplifyRect(i, window.innerHeight, rectWidth, -rectHeight, dy, r, g, b);

        rectArr.push(rect);

        j++;
    };
};
//store mouse position
function recMouse(e) {
    mouse.x = e.x;
    mouse.y = e.y;
};

window.addEventListener('mousemove', recMouse );

(function () {
    flowCanvas.width = window.innerWidth;
    flowCanvas.height = window.innerHeight;
    init();
    requestAnimationFrame(animate);

})();

function animate() {
    
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, flowCanvas.width, flowCanvas.height);

    rectArr.forEach(rect => rect.update());
};

