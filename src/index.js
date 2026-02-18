import "./styles.css";
import * as logic from "./logic.js";

const playerBoard = document.getElementById("player-board");
const opponentBoard = document.getElementById("opponent-board");
const newgameBtn = document.getElementById("new-game");

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "r") {
        isHorizontal = !isHorizontal;
    }
});

newgameBtn.addEventListener("click", () => {
    clearWinner();
    game = logic.createGame();

    placingShips = true;
    currentShipIndex = 0;

    game.player1.board.gameBoard.forEach((row) =>
        row.forEach((cell) => {
            cell.ship = null;
            cell.attacked = false;
        }),
    );

    populateBoard(playerBoard, game.player1.board);
    populateBoard(opponentBoard, game.player2.board);
});

let game;
let winnerElement = null;
let placingShips = true;
let currentShipIndex = 0;
let isHorizontal = true;

const clearWinner = () => {
    if (winnerElement) {
        winnerElement.remove();
        winnerElement = null;
    }
};

const showWinner = (winner) => {
    clearWinner();
    winnerElement = document.createElement("div");
    winnerElement.classList.add("winner");
    winnerElement.textContent = `${winner} wins!`;
    document.body.appendChild(winnerElement);
};

const populateBoard = (boardElement, boardModel) => {
    boardElement.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            const cellData = boardModel.gameBoard[i][j];
            if (cellData.attacked) {
                if (cellData.ship) {
                    cell.classList.add("attacked-hit");
                } else {
                    cell.classList.add("attacked-miss");
                }
            }

            if (cellData.ship && boardElement === playerBoard) {
                cell.classList.add("ship");
            }

            cell.addEventListener("click", () => {
                if (placingShips && boardElement === playerBoard) {
                    const ship = game.player1.board.ships[currentShipIndex];
                    if (!ship) return;

                    const bow = [i, j];
                    const stern = isHorizontal
                        ? [i, j + ship.length - 1]
                        : [i + ship.length - 1, j];

                    const result = game.player1.board.placeShip(
                        ship,
                        bow,
                        stern,
                    );

                    if (result.ok) {
                        currentShipIndex++;
                        populateBoard(playerBoard, game.player1.board);

                        if (
                            currentShipIndex >= game.player1.board.ships.length
                        ) {
                            placingShips = false;
                        }
                    }

                    return;
                }

                if (boardElement !== opponentBoard || placingShips) return;

                const result = game.attack(i, j);
                if (!result.ok) return;

                populateBoard(playerBoard, game.player1.board);
                populateBoard(opponentBoard, game.player2.board);

                if (result.gameOver) {
                    showWinner(result.winner);
                } else {
                    setTimeout(() => {
                        const aiResult = game.computerAttack();

                        populateBoard(playerBoard, game.player1.board);

                        if (aiResult.gameOver) {
                            showWinner(aiResult.winner);
                        }
                    }, 400);
                }
            });

            boardElement.appendChild(cell);
        }
    }
};

game = logic.createGame();
populateBoard(playerBoard, game.player1.board);
populateBoard(opponentBoard, game.player2.board);
