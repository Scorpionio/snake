const itemArr = document.querySelectorAll(".block-item");
const pointText = document.getElementById("point");


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
console.log(arrOfNumbers);


//====Игрок

let xPosition = 0;
let yPosition = 0;
let xPositionOld = 0;
let yPositionOld = 0;
let playerArr = [0];
let playerOld = playerArr[playerArr.length - 1];

window.addEventListener('keydown', (event) => {
    /*playerOld = playerArr[playerArr.length - 1];
    yPositionOld = Math.floor(playerOld/10);
    xPositionOld = playerOld - Math.floor(playerOld/10) * 10;*/
    yPositionOld = yPosition;
    xPositionOld = xPosition;
    switch (event.code) {
        case 'ArrowUp':
            yPosition--;
            if (yPosition < 0) {
                yPosition++;
                alert("You lose");
            } else {
                cheak();
            }
            break;
        case 'ArrowRight':
            xPosition++;
            if (xPosition >= itemMatrix.length) {
                xPosition--;
                alert("You lose");
            } else {
                cheak();
            }
            break;
        case 'ArrowDown':
            console.log(yPosition);
            yPosition++;
            if (yPosition >= itemMatrix.length) {
                yPosition--;
                alert("You lose");
            } else {
                cheak();
            }
            break;
        case 'ArrowLeft':
            xPosition--;
            if (xPosition < 0) {
                xPosition++;
                alert("You lose");
            } else {
                cheak();
            }
            break;
    }
    
})

function cheak() {
    if (itemMatrix[yPosition][xPosition].classList.contains('player')) {
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
    console.log(playerArr);
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