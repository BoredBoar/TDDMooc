export class Tetromino {
    static #T = ['.T.\nTTT\n...\n', `.T.\n.TT\n.T.\n`,'...\nTTT\n.T.\n',`.T.\nTT.\n.T.\n`]
    static #I = [`.....\n.....\nIIII.\n.....\n.....\n`, `..I..\n..I..\n..I..\n..I..\n.....\n`]
    static #O = [`.OO\n.OO\n...\n`]
    state
    orientation

    static T_SHAPE = new Tetromino(this.#T, 0)
    static I_SHAPE = new Tetromino(this.#I, 0) 
    static O_SHAPE = new Tetromino(this.#O, 0)
    constructor(block, orientation) {
        this.state = [...block]
        this.orientation = orientation
    }

    rotateRight() {
        return new Tetromino(this.state,
            this.orientation < this.state.length -1 ? this.orientation + 1 : 0
        )
    }

    rotateLeft() {
        return new Tetromino(this.state,
            this.orientation > 0 ? this.orientation - 1 : this.state.length -1
        )
    }

    toString(){
        return this.state[this.orientation]
    }

}