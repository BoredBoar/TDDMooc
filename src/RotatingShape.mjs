export class RotatingShape {
state

    constructor(blocksStr) {
        this.state = blocksStr.trim().replaceAll(' ', '').split('\n').map(line => {return line.split('')})
    }

    toString(){
        return this.#arrayToString(this.state)
    }

    rotateRight() {
        //  [ [ABC]      [ [GDA]
        //    [DEF]  =>    [HEB]
        //    [GHI]]       [IFC] ]
        return new RotatingShape( 
            this.#arrayToString(
                this.state.reduce((new_state,row) => {
                    row.forEach((element,index) => {
                        new_state[index].unshift(element); 
                    })
                    return new_state
                },this.#createEmptyState(this.state.length))
            )
        )
    }

    rotateLeft() {
        //  [ [ABC]      [ [CFI]
        //    [DEF]  =>    [BEH]
        //    [GHI]]       [ADG] ]
        return new RotatingShape( 
            this.#arrayToString(
                this.state.reduce((new_state,row) => {
                    row.forEach((element,index) => {
                        new_state[index].push(element); 
                    })
                    return new_state
                },this.#createEmptyState(this.state.length)).reverse()
            )
        )
    }

    #arrayToString = arr => {
        return arr.map(line => {return line.join('') + '\n'}).join('')
    }

    #createEmptyState = size => {
        return Array.from({length:size}, row => {return []})
    }
}