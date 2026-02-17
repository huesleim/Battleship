import "./styles.css";
import * as logic from "./logic.js";

const playerBoard = document.getElementById("player-board");
const opponentBoard = document.getElementById("opponent-board");
const newgameBtn = document.getElementById("new-game");

let game;

newgameBtn.addEventListener("click", () => {
    game = logic.createGame();
    populateBoard(playerBoard, game.player1.board);
    populateBoard(opponentBoard, game.player2.board);
});

const showWinner = (winner) => {
    const winnerElement = document.createElement("div");
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

            if (cellData.ship) {
                cell.classList.add("ship");
            }

            cell.addEventListener("click", () => {
                if (boardElement !== opponentBoard) return;

                const result = game.attack(i, j);
                if (!result.ok) return;

                populateBoard(playerBoard, game.player1.board);
                populateBoard(opponentBoard, game.player2.board);

                if (result.gameOver) {
                    showWinner(result.winner);
                }
            });

            boardElement.appendChild(cell);
        }
    }
};
