import {GameEntity} from "./entities/game-entity.js";
import {GameStatuses} from "./utility/game-statuses.js";
import {NumberUtility} from "./utility/number-utility.js";
import {MoveDirections} from "./utility/move-directions.js";

describe('game', () => {
    it('game should be created and game status returned', () => {
        const numberUtility = new NumberUtility();
        const game = new GameEntity(numberUtility);
        expect(game.status).toBe(GameStatuses.SETTINGS)
    })

    it('game should be created, started and game status returned as IN_PROGRESS', async() => {
        const numberUtility = new NumberUtility();
        const game = new GameEntity(numberUtility);
        await game.start();
        expect(game.status).toBe(GameStatuses.IN_PROGRESS)
    })

    it('player should be in the Grid after start', async() => {
        const numberUtility = new NumberUtility();
        for (let i=0; i<1000; i++) {
            const game = new GameEntity(numberUtility);
            expect(game.player1Position).toBeNull();

            await game.start();
            expect(game.player1Position.x).toBeLessThan(game.gridSize.columnsCount);
            expect(game.player1Position.x).toBeGreaterThanOrEqual(0);
            expect(game.player1Position.y).toBeLessThan(game.gridSize.rowsCount);
            expect(game.player1Position.y).toBeGreaterThanOrEqual(0);
        }
    })

    it('google should be in the Grid after start', async() => {
        for (let i=0; i<1000; i++) {
            const numberUtility = new NumberUtility();
            const game = new GameEntity(numberUtility);
            expect(game.googlePosition).toBeNull();
            await game.start();
            expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnsCount);
            expect(game.googlePosition.x).toBeGreaterThanOrEqual(0);
            expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount);
            expect(game.googlePosition.y).toBeGreaterThanOrEqual(0);
        }
    })

    it('google should be in the Grid but in new position after the jump', async() => {
        const numberUtility = new NumberUtility();
        const game = new GameEntity(numberUtility);
        game.googleJumpInterval = 1; //1ms
        await game.start();
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        for (let i = 0; i < 100; i++) {
            const prevGooglePosition = game.googlePosition;
            await delay(1);
            const currentGooglePosition = game.googlePosition;
            expect(currentGooglePosition).not.toEqual(prevGooglePosition);
        }
    })

    it('player should be moved in correct direction in the Grid', async() => {
        const mockNumberUtility = {
            index: 0,
            values: [
                2, 2,
                0, 0
            ],
            getRandomIntegerNumber(from, to) {
                return this.values[this.index++];
            }
        };
        const game = new GameEntity(mockNumberUtility);
        game.gridSize = {columnsCount: 3, rowsCount: 3};
        game.start();
        // 0  1  2
        //[ ][ ][ ] 0
        //[ ][ ][ ] 1
        //[ ][ ][p] 2
        expect(game.player1Position).toEqual({x: 2, y: 2});

        game.movePlayer(1, MoveDirections.RIGHT);
        expect(game.player1Position).toEqual({x: 2, y: 2});

        game.movePlayer(1, MoveDirections.DOWN);
        expect(game.player1Position).toEqual({x: 2, y: 2});

        game.movePlayer(1, MoveDirections.UP);
        expect(game.player1Position).toEqual({x: 2, y: 1});

        game.movePlayer(1, MoveDirections.UP);              
        expect(game.player1Position).toEqual({x: 2, y: 0});
                                   
        game.movePlayer(1, MoveDirections.LEFT);    
        expect(game.player1Position).toEqual({x: 1, y: 0});

        game.movePlayer(1, MoveDirections.UP);
        expect(game.player1Position).toEqual({x: 1, y: 0});

        game.movePlayer(1, MoveDirections.LEFT);
        expect(game.player1Position).toEqual({x: 0, y: 0});

        game.movePlayer(1, MoveDirections.DOWN);
        expect(game.player1Position).toEqual({x: 0, y: 1});

        game.movePlayer(1, MoveDirections.RIGHT);
        expect(game.player1Position).toEqual({x: 1, y: 1});
      })
})