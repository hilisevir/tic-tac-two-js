import {CheckWinCondition, updateGridUI, updateNextMoveIndicator} from "./gameplay.js";

export class GameBrain {
    // private
    #board = Array.from({ length: 5 }, () => Array(5).fill(null));
    #gridStartRow = 1
    #gridEndRow = 3
    #gridStartCol = 1
    #gridEndCol = 3

    currentPlayer = "X";
    get board() {
        return this.#board;
    }

    get gridStartRow() {
        return this.#gridStartRow;
    }
    get gridEndRow() {
        return this.#gridEndRow;
    }
    get gridStartCol() {
        return this.#gridStartCol;
    }
    get gridEndCol() {
        return this.#gridEndCol;
    }

    makeAMove(x, y) {
        if (this.#board[x][y] === null) {
            this.#board[x][y] = this.currentPlayer;

            updateGridUI()

            if (CheckWinCondition()) return;

            updateNextMoveIndicator()
        }
        else if (this.#board[x][y] === this.currentPlayer) {
            this.#board[x][y] = null;
        }
    }

    moveGrid(direction) {
        let gridStartRowTemp = this.#gridStartRow;
        let gridEndRowTemp = this.#gridEndRow;
        let gridEndColTemp = this.#gridStartCol;
        let gridStartColTemp = this.#gridEndCol;
        switch (direction) {
            case "up":
                if (this.#gridStartRow > 0) {
                    this.#gridStartRow--;
                    this.#gridEndRow--;
                    updateGridUI()
                }
                break;
            case "down":
                if (this.#gridEndRow < 4) {
                    this.#gridStartRow++;
                    this.#gridEndRow++;
                    updateGridUI()
                }
                break;
            case "left":
                if (this.#gridStartCol > 0) {
                    this.#gridStartCol--;
                    this.#gridEndCol--;
                    updateGridUI()
                }
                break;
            case "right":
                if (this.#gridEndCol < 4) {
                    this.#gridStartCol++;
                    this.#gridEndCol++;
                    updateGridUI()
                }
                break;
            case "up-left":
                if (gridStartRowTemp-- > 0 && gridStartColTemp-- > 0) {
                    this.#gridStartRow--;
                    this.#gridEndRow--;
                    this.#gridStartCol--;
                    this.#gridEndCol--;
                    updateGridUI()
                }
                break;
            case "up-right":
                if (gridStartRowTemp-- > 0 && gridEndColTemp++ < 4) {
                    this.#gridStartRow--;
                    this.#gridEndRow--;
                    this.#gridStartCol++;
                    this.#gridEndCol++;
                    updateGridUI()
                }
                break;
            case "down-left":
                if (gridEndRowTemp++ < 4 && gridStartColTemp-- > 0) {
                    this.#gridStartRow++;
                    this.#gridEndRow++;
                    this.#gridStartCol--;
                    this.#gridEndCol--;
                    updateGridUI()
                }
                break;
            case "down-right":
                if (gridEndRowTemp++ < 4 && gridEndColTemp++ < 4) {
                    this.#gridStartRow++;
                    this.#gridEndRow++;
                    this.#gridStartCol++;
                    this.#gridEndCol++;
                    updateGridUI()
                }
                break;
        }
    }

}