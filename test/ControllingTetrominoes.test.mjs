import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Controlling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  xit("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ...T......
       ..TTT.....
       ..........
       ..........
       ..........`
    );
  });

  xit("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.tick()
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .....T....
       ....TTT...
       ..........
       ..........`
    );
  });

  xit("a falling tetromino can be moved down", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick()
    board.moveDown()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....I.....
       ....I.....
       ....I.....
       ....I.....`
    );
  });
  
});

describe("Checking board boundaries", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  xit("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.O_SHAPE);
    board.tick()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.tick()
    board.moveLeft()
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       OO........
       OO........
       ..........
       ..........`
    );
  });

  xit("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.tick()
    board.moveRight()
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ........OO
       ........OO
       ..........
       ..........`
    );
  });

  xit("it cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  xit("it cannot be moved left through other blocks", () => {
    board.drop(Tetromino.I_SHAPE);
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.tick()
    board.tick()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       I.........
       I.T.......
       ITTT......
       I.........`
    );
  });

  xit("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.I_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.tick()
    board.tick()
    board.moveRight()
    board.moveRight()
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .........I
       .......T.I
       ......TTTI
       .........I`
    );
  });

  xit("it cannot be moved down through other blocks (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.tick()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

});