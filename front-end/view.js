import {MoveDirections} from "../core/utility/move-directions.js";
import {GameStatuses} from "../core/utility/game-statuses.js";

export class View {
    onstart = null;
    onplayermove = null;

    constructor(/*{onplayermove}*/) {
        document.addEventListener('keyup', (e) => {
            console.log(e.code)
            switch (e.code) {
                case 'ArrowUp':
                    this.onplayermove?.(1, MoveDirections.UP)
                    break;
                case 'ArrowDown':
                    this.onplayermove?.(1, MoveDirections.DOWN)
                    break;
                case 'ArrowLeft':
                    this.onplayermove?.(1, MoveDirections.LEFT)
                    break;
                case 'ArrowRight':
                    this.onplayermove?.(1, MoveDirections.RIGHT)
                    break;
                default:
                    return; //quit when non-arrow key is pressed
            }
        })
    }

    render(dto) {
        const rootElement= document.getElementById('root');

        rootElement.innerHTML = '';

        rootElement.append(`STATUS: ${dto.status}`);

        if(dto.status === GameStatuses.SETTINGS) {
            const settingsComponent = new SettingsComponent({onstart: this.onstart});

            const settingsElement = settingsComponent.render(dto);

            rootElement.append(settingsElement);
        } else if(dto.status === GameStatuses.IN_PROGRESS) {
            const gridComponent = new GridComponent(/*{onplayermove: this.onplayermove}*/);

            const gridElement = gridComponent.render(dto);

            rootElement.append(gridElement);
        }
    }

}

export class SettingsComponent {
    #props;
    constructor(props) {
        this.#props = props;
    }

    render(dto) {
        const container = document.createElement("div");
        container.classList.add('container');

        const button = document.createElement("button");
        button.append('START GAME');
        button.classList.add('btn', 'btn-primary')
        //observer pattern below
        /*button.addEventListener('click', () => {
        }) the line below is a shorter version*/
        button.onclick = () => {
            this.#props?.onstart?.();
        }

        container.append(button);
        return container;
    }
}

export class GridComponent {
    /*constructor({onplayermove}) {
        document.addEventListener('keyup', (e) => {
            console.log(e.code)
            switch (e.code) {
                case 'ArrowUp':
                    onplayermove(1, MoveDirections.UP)
                    break;
                case 'ArrowDown':
                    onplayermove(1, MoveDirections.DOWN)
                    break;
                case 'ArrowLeft':
                    onplayermove(1, MoveDirections.LEFT)
                    break;
                case 'ArrowRight':
                    onplayermove(1, MoveDirections.RIGHT)
                    break;
                default:
                    return; //quit when non-arrow key is pressed
            }
        })
    }*/

    render(dto) {
        const container = document.createElement("table");

        // Outer loop for y = rows (vertical)
        for (let y=0; y < dto.gridSize.rowsCount; y++) {
            const row = document.createElement("tr");

            // Inner loop for x = columns (horizontal)
            for (let x=0; x < dto.gridSize.columnsCount; x++) {
                const cell = document.createElement("td");

                if(dto.player1Position.x === x && dto.player1Position.y === y )  {
                    cell.textContent = '🧑‍💻';
                } else if(dto.googlePosition.x === x && dto.googlePosition.y === y )  {
                    cell.textContent = 'GOOGLE';
                }

                row.append(cell);
            }

            container.append(row);
        }

        return container;
    }
}
