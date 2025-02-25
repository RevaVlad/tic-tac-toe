const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

class TicTacToe {
    constructor(size = 3) {
        this.size = size;
        this.board = Array.from({ length: size }, () => Array(size).fill(null));
        this.currentPlayer = CROSS;
        this.winner = null;
    }

    makeMove(row, col) {
        if (this.winner) {
            console.log("Game over! Winner is:", this.winner);
            return false;
        }
        if (this.board[row][col] !== null) {
            console.log("Invalid move! Cell already occupied.");
            return false;
        }
        this.board[row][col] = this.currentPlayer;
        this.checkWinner();
        this.currentPlayer = this.currentPlayer === CROSS ? ZERO : CROSS;
        return true;
    }

    checkWinner() {
        const { size, board } = this;

        // Check rows and columns
        for (let i = 0; i < size; i++) {
            if (board[i].every(cell => cell === this.currentPlayer)) {
                this.winner = this.currentPlayer;
                return;
            }
            if (board.map(row => row[i]).every(cell => cell === this.currentPlayer)) {
                this.winner = this.currentPlayer;
                return;
            }
        }

        if (board.every((row, i) => row[i] === this.currentPlayer)) {
            this.winner = this.currentPlayer;
            return;
        }
        if (board.every((row, i) => row[size - i - 1] === this.currentPlayer)) {
            this.winner = this.currentPlayer;
            return;
        }
    }

    isFull() {
        return this.board.every(row => row.every(cell => cell !== null));
    }

    reset() {
        this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
        this.currentPlayer = CROSS;
        this.winner = null;
    }
}

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
