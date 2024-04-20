const boxes = document.querySelectorAll(".box");
const background = document.querySelector(".bg");
const result = document.querySelector("#result");
const playAgainBtn = document.querySelector("#play-again");

let turn = "X";
let isGameOver = false;

boxes.forEach(box => {
    box.textContent = "";
    box.addEventListener('click', () => {
        if (!isGameOver && box.textContent === "") {
            box.textContent = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function changeTurn () {
    if (turn === "X") {
        turn = "O";
        background.style.left = "85px";
    } else {
        turn = "X";
        background.style.left = "0";
    }
}

function checkWin () {
    let winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    
    winningConditions.forEach(e => {
        let v0 = boxes[e[0]].textContent;
        let v1 = boxes[e[1]].textContent;
        let v2 = boxes[e[2]].textContent;

        if (v0 !== "" && v0 === v1 & v0 === v2) {
            isGameOver = true;
            result.textContent = `${turn} won...✌️`;
            playAgainBtn.style.display = 'inline';

            for (i = 0; i < 3; i++) {
                boxes[e[i]].style.backgroundColor = "#eaf818";
                boxes[e[i]].style.color = "#252525";
            }
        }
    });
}

function checkDraw () {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(box => {
            if (box.textContent === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            result.textContent = `Draw 🫂`
            playAgainBtn.style.display = "inline";
        }
    }
}

function playAgain () {
    isGameOver = false;
    turn = "X";
    background.style.left = "0";
    result.textContent = "";
    playAgainBtn.style.display = "none";

    boxes.forEach(box => {
        box.textContent = "";
        box.style.removeProperty("background-color");
        box.style.color = "#fff"
    })
}

playAgainBtn.addEventListener('click', playAgain);