/*class Player extends Game_Unit {
    constructor(id, position) {
        super(position)
        this.id = id
    }
}*/

class Player /*extends Game_Unit*/ {
    #id = uuidv4()
    #playerPosition
    constructor (id, position) {
        this.playerPosition = position;
    }

    get id() {
        return this.#id;
    }

    get playerPosition() {
        return this.#playerPosition;
    }
}
