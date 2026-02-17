import "./styles.css";
import * as logic from "./logic.js";

const playerBoard = document.getElementById("player-board");
const opponentBoard = document.getElementById("opponent-board");
const statusDiv = document.getElementById("status");
const newgameBtn = document.getElementById("new-game");
const game = logic.createGame();
newgameBtn.addEventListener("click", () => {
    logic.createGame();
});

const populateBoard = (boardElement) => {
    for (let i = 0; i <= 10; i++) {
        for (let j = 0; j <= 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            boardElement.appendChild(cell);
            cell.addEventListener("click", () => {
                if (boardElement === opponentBoard) {
                    const result = game.attack(i, j);
                    if (!result.ok) {
                        cell.classList.add("attacked");
                    }
                }
            });
        }
    }
};

populateBoard(playerBoard);
populateBoard(opponentBoard);
