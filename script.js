const GRID_SIZE = 5;
const CLICKED_ITEM_BACKGROUND_COLOR = 'orange';

const $ = (domElem) => {
    return document.querySelector(domElem);
};

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`
}

function createNumber() {
    let numbers = [];
    for (let i = 1; i <= GRID_SIZE * GRID_SIZE; i++) {
        numbers.push(i)
    }
  
    return numbers;
}

function getRandomValue(arr) {
    arr.sort(function () {
        return Math.random() - .25;
    });
}

const grid = $('.wrap');

function refillGrid(grid) {
    grid.style['grid-template-rows'] = `repeat(${GRID_SIZE}, 1fr)`;
    grid.style['grid-template-columns'] = `repeat(${GRID_SIZE}, 1fr)`;
    grid.style.display = 'grid';
    grid.innerHTML = '';

    let numbers = createNumber();
    getRandomValue(numbers);
    for (let i = 0; i < numbers.length; i++) {
        let element = document.createElement("div");
        element.innerHTML = numbers[i];
        element.style.color = getRandomColor();
        element.style.fontSize = `${getRandom(12, 38)}px`;
        element.classList.add('grid-cell');
        element.classList.add('item');
        element.addEventListener('click', onClickGridElem);

        grid.append(element);
    }
  
}


let prevClickedNumber = 0;
function onClickGridElem(event) {
    const clickedElement = +event.target.innerHTML;
    
    if ((prevClickedNumber + 1) == clickedElement) {
        event.target.style.backgroundColor = CLICKED_ITEM_BACKGROUND_COLOR;
        prevClickedNumber++;
    }

    if(prevClickedNumber === GRID_SIZE * GRID_SIZE){
        onGameWin();
        prevClickedNumber = 0;
    }
};

let timer = document.getElementById('timer');
let interval = null;

function startGame() {
    let counter = 60;
    timer.innerHTML = counter;
    $('.time').hidden = false;
    refillGrid(grid);
   
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        counter--;
        timer.innerHTML = counter;

        if (counter === 0) {
            onGameFailed()
        }
    }, 1000);
}

const btnStart = $('.btn-start');
btnStart.addEventListener('click', () => {
    $('.game-start').style.display = 'none';
    $('.game').className = 'game';

    startGame();
});

const messageFailed = document.getElementById('messageFailed');

function onGameFailed() {
    grid.style.display = 'none';
    messageFailed.hidden = false;
    clearInterval(interval);
}

const btnRestart = $('.btn-restart');
btnRestart.addEventListener('click', () => {
    messageWin.hidden = true;
    messageFailed.hidden = true;
    prevClickedNumber = 0;
    startGame();

});

const messageWin = document.getElementById('messageWin');

function onGameWin() {
    grid.style.display = 'none';
    messageWin.hidden = false;
    $('.time').hidden = true;
    clearInterval(interval);
}