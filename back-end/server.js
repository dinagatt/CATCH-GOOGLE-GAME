import {WebSocketServer} from "ws";
import {GameEntity} from "../core/entities/game-entity.js";
import {NumberUtility} from "../core/utility/number-utility.js";

const numberUtility = new NumberUtility();
const game = new GameEntity(numberUtility);

/*const port = 8080;*/
const wss = new WebSocketServer({port: 8080});

function createDTO() {
    const dto = {
        status: game.status,
        gridSize: game.gridSize,
        googlePosition: game.googlePosition,
        player1Position: game.player1Position,
    };

    return dto;
}

wss.on('connection', (channel) => {

    console.log('New client connected')

    //GAME SUBSCRIBES TO GAME CHANGES
    game.subscribe(() => {
        channel.send(JSON.stringify(createDTO()), { binary: false });
    });

    //MESSAGES FROM CLIENT
    channel.on('message', (message) => {
        try {
            const action = JSON.parse(message.toString());

            switch (action.type) {
               case 'start': {
                   game.start();
                   break;
               }
               case 'move-player': {
                game.movePlayer(action.payload.playerNumber, action.payload.moveDirection);
                break;
               }
                default: console.warn(`Unknown action type '${action.type}'`);
            }
        } catch(error) {
            console.error('Invalid message format');
        }
    });

    //TO SEE THE INITIAL STATE OG GAME
    channel.send(JSON.stringify(createDTO()), { binary: false });
});

console.log('WebSocket server us running on ws://localhost:8080');