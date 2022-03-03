// import { Block } from "../src/Block.mjs";

export class Board {
  width;
  height;
  board;
  piece;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from({length:this.height}, row => {return Array.from({length:this.width}, () => {return '.'})})
    this.piece = []
  }

  toString() {
    let tmp_board = [...this.board]
    this.piece.forEach(piece => {
      tmp_board[piece.y][piece.x] = piece.pattern
      // console.log(piece, tmp_board);
    })
    return tmp_board.map(row => {return row.join('')}, '').join('\n') + '\n'
  }

  drop(x) {
    this.piece.map(item => {throw('Piece is already falling, cannot drop another piece')})
    this.piece = [{x: Math.floor(this.width/2), y: 0, pattern:[x.color]}]
  }

  tick() {
    this.#pieceCanFall(this.piece) 
      ? this.piece = this.piece.map(item => {
          const new_position = {...item, y: item.y + 1}
          return new_position
        })
      : this.piece.forEach(item => {
        this.board = [...this.board]
        this.board[item.y][item.x] = item.pattern
        this.piece = []
      })
  }

  hasFalling() {
    return this.piece.length > 0
  }

  #pieceCanFall = (piece) => {
    return piece.reduce((mobile,item) => {return item.y < this.height - 1 &&  this.board[item.y + 1][item.x] == '.'},false)
  }
}
