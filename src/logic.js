const createShip = (name, length) => {
    let hits = 0;
    const hit = () => {
        hits++;
    };
    const isSunk = () => {
        return hits >= length;
    };
    return { name, length, hit, isSunk };
};

const shipTypes = [
    { name: "carrier", length: 5 },
    { name: "battleship", length: 4 },
    { name: "cruiser", length: 3 },
    { name: "submarine", length: 3 },
    { name: "destroyer", length: 2 },
];

const createBoard = () => {
    let gameBoard = [];
    const ships = shipTypes.map((type) => createShip(type.name, type.length));

    for (let i = 0; i < 10; i++) {
        const row = [];
        for (let j = 0; j < 10; j++) {
            row.push({ ship: null, attacked: false });
        }
        gameBoard.push(row);
    }

    const receiveAttack = (x, y) => {
        const cell = gameBoard[x][y];

        if (cell.attacked) {
            return { ok: false, hit: false, reason: "duplicate_attack" };
        }

        cell.attacked = true;

        const hit = !!cell.ship;

        if (hit) {
            cell.ship.hit();
        }

        return { ok: true, hit, reason: null };
    };

    const placeShip = (ship, bow, stern) => {
        const [x1, y1] = bow;
        const [x2, y2] = stern;

        const dx = x2 - x1;
        const dy = y2 - y1;

        const length = ship.length;
        const distance = Math.max(Math.abs(dx), Math.abs(dy)) + 1;

        if (
            x1 < 0 ||
            x1 >= 10 ||
            y1 < 0 ||
            y1 >= 10 ||
            x2 < 0 ||
            x2 >= 10 ||
            y2 < 0 ||
            y2 >= 10
        ) {
            return { ok: false, reason: "out_of_bounds" };
        }

        if (dx !== 0 && dy !== 0) {
            return { ok: false, reason: "invalid_alignment" };
        }

        if (distance !== length) {
            return { ok: false, reason: "invalid_length" };
        }

        // Validation pass
        for (let i = 0; i < length; i++) {
            const x = x1 + (dx === 0 ? 0 : dx > 0 ? i : -i);
            const y = y1 + (dy === 0 ? 0 : dy > 0 ? i : -i);

            if (gameBoard[x][y].ship) {
                return { ok: false, reason: "overlap" };
            }
        }

        for (let i = 0; i < length; i++) {
            const x = x1 + (dx === 0 ? 0 : dx > 0 ? i : -i);
            const y = y1 + (dy === 0 ? 0 : dy > 0 ? i : -i);

            gameBoard[x][y].ship = ship;
        }

        return { ok: true };
    };

    const allShipsSunk = () => {
        return ships.every((ship) => ship.isSunk());
    };

    const randomlyPlaceAllShips = () => {
        ships.forEach((ship) => {
            let placed = false;

            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const horizontal = Math.random() < 0.5;

                const bow = [x, y];
                const stern = horizontal
                    ? [x, y + ship.length - 1]
                    : [x + ship.length - 1, y];

                const result = placeShip(ship, bow, stern);
                if (result.ok) placed = true;
            }
        });
    };

    return {
        gameBoard,
        ships,
        receiveAttack,
        placeShip,
        allShipsSunk,
        randomlyPlaceAllShips,
    };
};

const checkLost = (player) => {
    return player.board.allShipsSunk();
};

const newPlayer = (name) => {
    const board = createBoard();
    return { name, board };
};

const createGame = () => {
    const player1 = newPlayer("Player 1");
    const player2 = newPlayer("Player 2");
    let currentPlayer = player1;
    let opponent = player2;
    let gameOver = false;
    player1.board.randomlyPlaceAllShips();
    player2.board.randomlyPlaceAllShips();

    const switchTurn = () => {
        [currentPlayer, opponent] = [opponent, currentPlayer];
    };

    const attack = (x, y) => {
        const result = opponent.board.receiveAttack(x, y);
        if (gameOver) {
            return { ok: false, reason: "game_over" };
        }
        if (!result.ok) return result;

        if (checkLost(opponent)) {
            gameOver = true;
            return {
                ok: true,
                hit: result.hit,
                gameOver: true,
                winner: currentPlayer.name,
            };
        }

        switchTurn();

        return {
            ok: true,
            hit: result.hit,
            gameOver: false,
        };
    };

    return {
        player1,
        player2,
        attack,
        switchTurn,
        getCurrentPlayer: () => currentPlayer,
        getOpponent: () => opponent,
    };
};

export { createShip, checkLost, createBoard, newPlayer, createGame };
