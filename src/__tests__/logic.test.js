import { createShip, createBoard } from "../logic";

describe("createShip", () => {
  test("increments hits", () => {
    const ship = createShip("destroyer", 2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("sinks after enough hits", () => {
    const ship = createShip("destroyer", 2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("createBoard", () => {
  test("board is 10x10", () => {
    const board = createBoard();
    expect(board.gameBoard.length).toBe(10);
    expect(board.gameBoard[0].length).toBe(10);
  });

  test("receiveAttack marks cell as attacked", () => {
    const board = createBoard();
    board.receiveAttack(0, 0);
    expect(board.gameBoard[0][0].attacked).toBe(true);
  });
});