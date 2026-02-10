const createShip = (length) => {
    let hits = 0;
    const hit = () => {
        hits++;
    };
    const isSunk = () => {
        return hits >= length;
    };
    return { length, hit, isSunk };
};

const createTeam = () => {
    const ships = [];
    const carrier = createShip(5);
    const battleship = createShip(4);
    const cruiser = createShip(3);
    const submarine = createShip(3);
    const destroyer = createShip(2);
    ships.push(carrier, battleship, cruiser, submarine, destroyer);
    return { ships };
};

const createBoard = () => {
    let gameBoard = [];
    let attacks = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            gameBoard.push({ x: i, y: j, ship: null });
        }
    }

    const receiveAttack = (x, y) => {
        const attack = { x, y };
        const cell = gameBoard.find((cell) => cell.x === x && cell.y === y);
        if (cell.ship) {
            cell.ship.hit();
        }
        attacks.push(attack);
    };
    return { gameBoard, attacks, receiveAttack };
};

const placeShip = (board, ship, x, y, orientation) => {};

const newPlayer = (name) => {
    const team = createTeam();
    const board = createBoard();
    return { name, team, board };
};

export { createShip, createTeam, createBoard, placeShip, newPlayer };
