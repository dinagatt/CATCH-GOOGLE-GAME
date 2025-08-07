/*class Position {
    #numberUtility
    #gridSize = {
        columnsCount: 4,
        rowsCount: 4,
    }
    constructor(smthSimilarToNumberUtility, gridSize) {
        this.#numberUtility = smthSimilarToNumberUtility;
    }

    x =  this.#numberUtility.getRandomIntegerNumber(0, this.#gridSize.columnsCount)
    y = this.#numberUtility.getRandomIntegerNumber(0, this.#gridSize.rowsCount)
}*/

export class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    isEqualTo(position) {
        return position === {x: this.x, y: this.y};
    }
}
