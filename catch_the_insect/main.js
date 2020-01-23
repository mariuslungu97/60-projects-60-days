//selectors
const playGameBtn = document.getElementById('playGame');
const playGameDiv = document.querySelector('.play-game');
const chooseInsectDiv = document.querySelector('.choose-insect');
const spawnInsectsDiv = document.getElementById('spawnInsectsDiv');
const insectsBtns = document.querySelectorAll('.insects__insect');
const containerDiv = document.querySelector('.container');
const gameStartedDiv = document.querySelector('.game-started');
const timerMin = document.getElementById('timerMin');
const timerSec = document.getElementById('timerSec');
const scoreSpan = document.getElementById('score');

/*
    0 - Fly;
    1 - Mosquito;
    2 - Spider;
    3 - Roach;
*/  
const insectsImgUrls = [
    'http://pngimg.com/uploads/fly/fly_PNG3946.png',
    'http://pngimg.com/uploads/mosquito/mosquito_PNG18175.png',
    'http://pngimg.com/uploads/spider/spider_PNG12.png',
    'http://pngimg.com/uploads/roach/roach_PNG12163.png'
];

let selectedInsectId = null;
let selectedInsectImgUrl = null;
let score = 0;

function chooseInsect() {
    playGameDiv.classList.add('play-game__hide');
    chooseInsectDiv.classList.add('choose-insect__show');
};

function startTimer() {
    let sec = 0;
    let min = 0;

    const timer = setInterval(function() {

        const secStr = sec < 10 ? `0${sec}` : sec.toString();
        const minStr = min < 10 ? `0${min}` : min.toString();

        timerSec.innerText = secStr;
        timerMin.innerText = minStr;

        if(sec + 1 === 60) {
            min++;
            sec = 0;
        } else {
            sec++;
        }

    }, 1000);

};

function spawnInsect() {

    const insect = document.createElement('div');
    insect.classList.add('game-started__game--insect');
    insect.innerHTML = `<img src=${selectedInsectImgUrl}>`;
    insect.style.top = `${Math.floor(Math.random() * (spawnInsectsDiv.offsetHeight - 75))}px`;
    insect.style.left = `${Math.floor(Math.random() * (spawnInsectsDiv.offsetWidth - 75))}px`;
    insect.style.transform = `rotate(${Math.random() * 180}deg)`;
    insect.addEventListener('click', () => {
        //remove insects and spawn two more insects
        insect.parentElement.removeChild(insect);
        spawnInsect();
        spawnInsect();

        //update score and render new score
        score++;

        scoreSpan.innerText = score < 10 ? `0${score}` : score.toString();
    });

    spawnInsectsDiv.appendChild(insect);
};

function startGame(e) {

    const insectBtn = e.target.closest('.insects__insect');
    
    if(insectBtn) {
        selectedInsectId = insectBtn.dataset.id ? parseInt(insectBtn.dataset.id, 10) - 1 : null;
        if(selectedInsectId) {
            startTimer();
            chooseInsectDiv.classList.add('choose-insect__hide');
            gameStartedDiv.classList.add('game-started__show');
            selectedInsectImgUrl = insectsImgUrls[selectedInsectId];
            spawnInsect();
        } 
    };

};

playGameBtn.addEventListener('click', chooseInsect);
insectsBtns.forEach(btn => btn.addEventListener('click', startGame));