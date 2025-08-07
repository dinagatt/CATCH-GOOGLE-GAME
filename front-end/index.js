import {Controller} from "./controller.js";
import {View} from "./view.js";
import {GameProxy} from "./game-proxy.js";

//composition root
const view = new View();
/* no need in this when monolith app, as well as a changed line below
const numberUtility = new NumberUtility();*/
const game = new GameProxy(); /*new GameEntity(numberUtility);*/

const controller = new Controller(view, game);

const intervalId = setInterval(() => {
    if (game.initialized) {
        controller.init();
        clearInterval(intervalId);
    }
}, 100);
