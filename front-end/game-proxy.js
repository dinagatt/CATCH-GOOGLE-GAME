export class GameProxy/*aka ModelRemoteProxy*/ {
    #wsChannel = null;
    #stateCache = null;
    constructor() {
        this.#wsChannel = new WebSocket('ws://localhost:8080');

        this.#wsChannel.addEventListener('message', (event) => {
            const receivedData = JSON.parse(event.data);
            this.#stateCache = receivedData;
            this.#notify();
        })
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
        //add logic
    }

    start() {
        const action = {type: 'start'};
        return this.#wsChannel.send(JSON.stringify(action));
    }

    get initialized() {
        return this.#stateCache !== null;
    }

    get status() {
        return this.#stateCache.status;
    }

    get googlePosition() {
        return this.#stateCache.googlePosition;
    }

    get player1Position() {
        return this.#stateCache.player1Position;
    }

    set player1Position(value) {
        //add logic
    }

    get gridSize() {
        return this.#stateCache.gridSize;
    }

    set gridSize(value) {
        //add logic
    }

    movePlayer(playerNumber, moveDirection) {
        const action = {
            type: 'move-player',
            payload: {
                playerNumber,
                moveDirection
            }
        };
        return this.#wsChannel.send(JSON.stringify(action));
    }
}
