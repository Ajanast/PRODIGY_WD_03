const boxes = document.querySelectorAll(".box");
const turn = document.querySelector(".turn");
const result = document.querySelector(".result");
const btn = document.querySelector(".btn");

let player = 'X';
let gameactive = false;
let board = ['', '', '', '', '', '', '', '', '']; 
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
boxes.forEach(box => {
    box.addEventListener('click', () => {
        const index = parseInt(box.id);
        if (board[index] === '' && !gameactive) {
            board[index] = player;
            box.innerHTML = player;
            if (winning(player)) {
                result.innerHTML = `${player} win!!`;
                gameactive = false;
            } else if (board.every(box => box !== '')) { 
                result.innerHTML = 'Draw!';
            } else {
                player = player == 'X' ? 'O' : 'X'; 
                turn.innerHTML = `Player ${player} turn`;
            }
        }
    })
});

function winning(player) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        let hasWon = true;

        for (let j = 0; j < combination.length; j++) {
            const index = combination[j];
            if (board[index] !== player) {
                hasWon = false;
                break;
            }
        }

        if (hasWon) {
            return true;
        }
    }

    return false;
}

btn.addEventListener('click', () => {
    player = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameactive = false;
    turn.innerText = `Player ${player} turn`;
    result.innerHTML=''
    boxes.forEach(box => {
        box.innerHTML = '';
    });
});
