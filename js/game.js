const itemArr = document.querySelectorAll(".block-item");
const pointText = document.getElementById("point");

//======Старт

const button = document.getElementById("start");
const gameUI = document.getElementById("game");

function startGame() {
    button.style.display = "none";
    gameUI.style.backgroundColor = "#ffffff00";
    start();
}

//==Создание матрицы

let itemArrIndex = 0;
let arrOfNumbers = [];
const itemMatrix = [];
for (let i = 0; i < itemArr.length / 10; i++) {
    itemMatrix.push([]);
}
for (let i = 0; i < itemMatrix.length; i++) {
    for (let j = 0; j < itemMatrix.length; j++) {
        itemMatrix[i].push(itemArr[itemArrIndex]);
        itemArrIndex++;
    }
}

for (let i = 0; i < itemArr.length; i++) {
    arrOfNumbers.push(i);
}

let cycle;
function start() {
    cycle = setInterval(game, 150);
}


//====Игрок

let text = "";
let xPosition = 0;
let yPosition = 0;
let xPositionOld = 0;
let yPositionOld = 0;
let playerArr = [0];
let playerOld = playerArr[playerArr.length - 1];
let direction = "Right";
let directionOld = "";
let eventOld = "";

function restart() {
    text = "";
    xPosition = 0;
    yPosition = 0;
    xPositionOld = 0;
    yPositionOld = 0;
    playerArr = [0];
    playerOld = playerArr[playerArr.length - 1];
    direction = "Right";
    directionOld = "";
    changePosition(xPosition, yPosition);
    button.style.display = "block";
    gameUI.style.backgroundColor = "rgba(128, 128, 128, 0.493)";
}

window.addEventListener('keydown', (event) => {
    directionOld = direction;
    switch (event.code) {
        case 'ArrowUp':
            direction = "Up";
            break;
        case 'ArrowRight':
            direction = "Right";
            break;
        case 'ArrowDown':
            direction = "Down";
            break;
        case 'ArrowLeft':
            direction = "Left";
            break;
    }
})

function game() {
    yPositionOld = yPosition;
    xPositionOld = xPosition;
    switch (direction) {
        case "Up":
            yPosition--;
            // console.log(yPosition);
            // console.log(yPositionOld);
            // if (yPosition == yPositionOld) {
            //     yPosition++;
            //     direction = "Down";
            // } else {
            //     yPosition--;
            // }
            // console.log(yPosition);
            // console.log(yPositionOld);
            if (yPosition < 0) {
                yPosition++;
                restart();
                clearTimeout(cycle);
                alert("You lose");
            } else {
                cheak();
            }
            break;
        case "Right":
            xPosition++;
            // if (directionOld == "Left") {
            //     xPosition--;
            // } else {
            //     xPosition++;
            // }
            if (xPosition >= itemMatrix.length) {
                xPosition--;
                restart();
                clearTimeout(cycle);
                alert("You lose");
            } else {
                cheak();
            }
            break;
        case "Down":
            yPosition++;
            // if (directionOld == "Up") {
            //     yPosition--;
            // } else {
            //     yPosition++;
            // }
            if (yPosition >= itemMatrix.length) {
                yPosition--;
                restart();
                clearTimeout(cycle);
                alert("You lose");
            } else {
                cheak();
            }
            break;
        case "Left":
            xPosition--;
            // if (directionOld == "Right") {
            //     xPosition++;
            // } else {
            //     xPosition--;
            // }
            if (xPosition < 0) {
                xPosition++;
                restart();
                clearTimeout(cycle);
                alert("You lose");
            } else {
                cheak();
            }
            break;
    }
}

function cheak() {
    if (itemMatrix[yPosition][xPosition].classList.contains('player')) {
        restart();
        clearTimeout(cycle);
        alert("You lose");
        return 0;
    }
    if (xPosition == xApple && yPosition == yApple) {
        itemMatrix[yApple][xApple].classList.remove('apple');
        itemMatrix[yPositionOld][xPositionOld].classList.add('player');
        playerArr.unshift(yPositionOld * 10 + xPositionOld);
        changePosition(xPosition, yPosition);
        addApple(playerArr);
    } else {
        changePosition(xPosition, yPosition);
    }
}

function changePosition(x, y) {
    playerArr.shift();
    playerArr.push(yPosition * 10 + xPosition);
    itemMatrix.forEach(function(item) {
        item.forEach(function (i) {
            i.classList.remove('player');
        })
    });
    playerArr.forEach((q) => {
        itemMatrix[Math.floor(q/10)][q - Math.floor(q/10) * 10].classList.add('player');
    })
    
    return playerArr;
}

function randomMethod(r) {
    let random = r[Math.floor(Math.random() * r.length)];
    return [Math.floor(random/10), random - Math.floor(random/10) * 10];
}


//====Яблоки

let xApple;
let yApple;
let appleAte = 0;
addApple();
function addApple() {
    let newPlayerArr = arrOfNumbers.slice();
    let result = newPlayerArr.filter(el_A => !playerArr.includes(el_A))
    let randomArr = randomMethod(result);
    xApple = randomArr[1];
    yApple = randomArr[0];
    itemMatrix[yApple][xApple].classList.add('apple');
    pointText.textContent = `Счёт: ${appleAte}`;
    appleAte++;
}