export class Controller {
    #view
    #model //'game' in our case
    constructor(smthLikeView, smthLikeModel) {
        this.#view = smthLikeView;
        this.#model = smthLikeModel;

        //low coupling
        this.#model.subscribe(() => {
            this.#render()
        })

        this.#model.subscribe(() => {
            console.log('STATE OF GAME CHANGED');
        })

        this.#view.onstart = () => {
            this.#model.start();
        };

        this.#view.onplayermove = (playerNumber, direction) => {
            this.#model.movePlayer(playerNumber, direction);
        };
    }

     init() {
        this.#render();
     }

     #render() {
         const dto = {
             status: this.#model.status,
             gridSize: this.#model.gridSize,
             googlePosition: this.#model.googlePosition,
             player1Position: this.#model.player1Position,
         };
         this.#view.render(dto);
     }
}

/*
export class AlteredController {
    #model
    #view
    constructor(smthLikeModel, smthLikeView) {
        this.#model = smthLikeModel;
        this.#view = smthLikeView;

        this.#model.subscribe(() => {
            console.log('STATE OF GAME CHANGED');
        })

        this.#view.onstart = () => {
            this.#model.start();
        };

    }

    init() {
        this.#view.render(this.#mapModelToDTO());

        this.#view.onstart = () => {
            this.#start();
        }

        this.#view.onplayermove = (playerNumber, direction) => {
            this.#model.movePlayer(playerNumber, direction);
        };

        this.#model.subscribe(() => {
            this.#view.render(this.#mapModelToDTO);
        })
    }

    #start() {
        this.#model.start();
        this.#view.render(this.#mapModelToDTO);
    }

    #mapModelToDTO() {
        return {
            status: this.#model.status,
            gridSize: this.#model.gridSize,
            googlePosition: this.#model.googlePosition?.clone(),
            player1Position: this.#model.player1Position?.clone(),
        }
    }
}*/
