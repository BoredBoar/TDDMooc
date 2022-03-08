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
    const tmp_board = this.piece.length > 0
      ? this.#drawPieceOnBoard(this.board, this.piece[0])
      : [...this.board]
    return tmp_board.map(row => {return row.join('')}, '').join('\n') + '\n'
  }

  drop(x) {
    this.piece.map(item => {throw('Piece is already falling, cannot drop another piece')})
    let new_piece = x.state[x.orientation].split('\n').filter(row => {return row.replaceAll('.','') != ''}).map(line => {return line.split('')})
    this.piece = [{x: Math.floor(this.width/2), y: 0, pattern : new_piece, block: x}]
  }

  tick() {
    this.#pieceCanFall(this.piece) 
      ? this.piece = this.piece.map(item => {
          const new_position = {...item, y: item.y + 1}
          return new_position
        })
      : this.piece.forEach(item => {
          this.board = this.#drawPieceOnBoard(this.board, item)
        this.piece = []
        })
  }

  hasFalling() {
    return this.piece.length > 0
  }

  #pieceCanFall = (piece) => {
    return piece.length > 0  
      ?  this.#pieceNotOnBottem(piece) && this.#pieceNotBlocked(piece)
      : false
  }

  #pieceNotOnBottem = (piece) => {
    return piece[0].y + piece[0].pattern.length < this.height
  }

  #pieceNotBlocked = (piece) => {
    return piece[0].pattern.reduce((mobile, row, r_index) => {
      return row.reduce((not_blocked,square, c_index) => {
        return ( square === '.' || this.board[piece[0].y + r_index + 1][piece[0].x + c_index - (row.length - 1)] === '.' ) && not_blocked
      },true) && mobile
    },true)
  }

  #drawPieceOnBoard = (board, piece) => {
    let new_board = [...board]
    piece.pattern.forEach((row, r_index) => {
      row.forEach((square, c_index) => {
        new_board[piece.y + r_index][piece.x + c_index - (row.length - 1)] = square
      })
    })    
    return new_board
  }
  
}
