import {GameStatuses} from "../utility/game-statuses.js";
import {GridSize} from "./grid_size.entity.js";
import {MoveDirections} from "../utility/move-directions.js";
import {Position} from "./position.entity.js";

export class GameEntity {
    #status = GameStatuses.SETTINGS
    #googlePosition = null
    #numberUtility
    /*#playersPositions = {
        '1': null,
        '2': null,
    }*/
    #player1Position = null
    #player2Position = null
    #settings = {
        gridSize: new GridSize(4,4),
        googleJumpInterval: 1000
    }

    constructor(smthSimilarToNumberUtility) {
        this.#numberUtility = smthSimilarToNumberUtility; //must have 'getRandomIntegerNumber' method
    }

    //UI
    #observers = [];
    subscribe(observerFunction) {
        this.#observers.push(observerFunction);
    }
    #notify() {
        this.#observers.forEach(observerFunction => observerFunction(/*Game*/));
    }

    /**
     * Sets the googleJumpInterval setting.
     *
     * @param {number} newValue - The new interval value to set (must be a positive number).
     * @throws {TypeError} If newValue is not a number.
     * @throws {TypeError} If newValue is less than or equal to 0.
     */
    set googleJumpInterval(newValue) {
        if(typeof newValue !== 'number') {
            throw new TypeError('newValue must be a number');
        }
        if (newValue <= 0) {
            throw new TypeError('Value must be a positive number');
        }
        this.#settings.googleJumpInterval = newValue;

        this.#notify();
    }

    start() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error(`Game must be in status 'SETTINGS' before start`);
        }
        this.#status = GameStatuses.IN_PROGRESS;

        this.#placePlayerToGrid();
        this.#makeGoogleJump();

        this.#notify();

        setInterval(() => {
            this.#makeGoogleJump();
            this.#notify();
        }, this.#settings.googleJumpInterval);
    }

    #placePlayerToGrid() {
        const newPosition = new Position(
            this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnsCount),
            this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowsCount)
        );

        this.#player1Position = newPosition;
    }

    #place2ndPlayerInGrid() {
        /*const newPosition = {
            x: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnsCount),
            y: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowsCount),
        }*/

        const newPosition = new Position(
            this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnsCount),
            this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowsCount)
        );

        if (newPosition.isEqualTo(this.#player1Position)) {
            return;
        }

        this.#player1Position = newPosition;
    }

    #makeGoogleJump() {
        const newPosition = {
            x: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnsCount),
            y: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowsCount),
        }

        if((newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) || (newPosition.x === this.player1Position.x && newPosition.y === this.player1Position?.y)) {
            this.#makeGoogleJump();
            return;
        }

        this.#googlePosition = newPosition;
    }

    get status() {
        return this.#status;
    }

    get googlePosition() {
        return this.#googlePosition;
    }

    get player1Position() {
        return this.#player1Position;
    }

    set player1Position(value) {
        return this.#player1Position = value;
    }

    get gridSize() {
        return this.#settings.gridSize;
    }

    set gridSize(value) {
        return this.#settings.gridSize = value;
        this.#notify();
    }

    movePlayer(playerNumber, moveDirection) {
        const position = this['player' + playerNumber + 'Position'];
        let newPosition;
        switch(moveDirection) {
            case MoveDirections.UP: {
                /*newPosition = {
                    x: position.x,
                    y: position.y - 1
                }*/
                newPosition = new Position(position.x, position.y - 1);
                break;
            }
            case MoveDirections.DOWN: {
               /* newPosition = {
                    x: position.x,
                    y: position.y + 1
                }*/
                newPosition = new Position(position.x, position.y + 1);
                break;
            }
            case MoveDirections.RIGHT: {
                /*newPosition = {
                    x: position.x + 1,
                    y: position.y
                }*/
                newPosition = new Position(position.x + 1, position.y);
                break;
            }
            case MoveDirections.LEFT: {
                /*newPosition = {
                    x: position.x - 1,
                    y: position.y
                }*/
                newPosition = new Position(position.x - 1, position.y);
                break;
            }
        }

        /*//better: const isInsideTheGrid
        const notInsideTheGrid = newPosition.x >= this.#settings.gridSize.columnsCount ||
            newPosition.x < 0 || newPosition.y >= this.#settings.gridSize.rowsCount || newPosition.y < 0;
        //better: isFreeFromOtherPlayer
        const occupiedGridPosition = "aaa";*/

        if(/*notInsideTheGrid*/newPosition.x >= this.#settings.gridSize.columnsCount ||
            newPosition.x < 0 || newPosition.y >= this.#settings.gridSize.rowsCount || newPosition.y < 0 /*|| occupiedGridPosition*/) {
            return;
        }

        /* FINISH THIS LOGIC
        if(googleInThisPosition) {
            this.#catchGoogle(playerNumber)
        }*/

        /*const newP = this['player' + playerNumber + 'Position']
        console.log(newP)*/
        this['player' + playerNumber + 'Position']/*.#player1Position*/ = newPosition;
        this.#notify();
    }
}
