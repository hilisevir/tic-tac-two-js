export function getInitialBoard(gameBrain, cellUpdateFn) {
    let boardUi = document.createElement("div");
    boardUi.classList.add("board");

    let boardMessage = document.createElement("div");
    boardMessage.classList.add("board_message");
    boardUi.appendChild(boardMessage);

    let nextMoveBy = document.createElement("p");
    nextMoveBy.id = "next-move-indicator";
    nextMoveBy.innerHTML = "Next Move By: " + gameBrain.currentPlayer;
    boardMessage.appendChild(nextMoveBy);

    let winMessage = document.createElement("p");
    winMessage.id = "win-message";
    boardMessage.appendChild(winMessage);

    for (let i = 0; i < 5; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement("div");
            if (i >= gameBrain.gridStartRow
                && i <= gameBrain.gridEndRow
                && j >= gameBrain.gridStartCol
                && j <= gameBrain.gridEndCol) {
                cell.classList.add("grid_cell");
            }
            cell.classList.add("board_cell");

            let piece = document.createElement("div");
            piece.classList.add("piece");

            piece.addEventListener("click", (event) => { cellUpdateFn(i, j, event); });
            cell.appendChild(piece);

            piece.innerHTML = gameBrain.board[i][j] || "&nbsp;";
            row.appendChild(cell);
        }
        boardUi.appendChild(row);
    }

    return boardUi;
}

export function getGamePageUI(gameBrain) {
    let parentUi = document.createElement("div");
    parentUi.classList.add("parent");
    document.body.appendChild(parentUi);

    let h1 = document.createElement("h1");
    h1.innerHTML = "TIC TAC TWO";
    parentUi.appendChild(h1);

    let boardController = createBoardController(gameBrain);
    parentUi.appendChild(boardController);

    return boardController;
}

function createBoardController(gameBrain) {
    let boardController = document.createElement("div");
    boardController.classList.add("board_controller");

    let controlPanel = document.createElement("div");
    controlPanel.classList.add("control_panel");
    boardController.appendChild(controlPanel);

    let gridControl = createGridControl(gameBrain);
    let mainControl = createMainControl();

    controlPanel.appendChild(gridControl);
    controlPanel.appendChild(mainControl);

    return boardController;
}

function createMainControl() {
    let mainControl = document.createElement("div");
    mainControl.classList.add("main_control");

    const mainButtons = [
        { class: "btn1", label: "Exit", route: "index.html" },
        { class: "btn2", label: "Reset", action: () => location.reload() }
    ];

    mainButtons.forEach(({ class: btnClass, label, route, action }) => {
        let button = document.createElement("button");
        button.classList.add("main-btn", btnClass);
        button.innerHTML = label;

        if (route) {
            button.dataset.route = route;
        }

        if (action) {
            button.addEventListener("click", action);
        }

        mainControl.appendChild(button);
    });

    return mainControl;
}

function createGridControl(gameBrain) {
    let gridControl = document.createElement("div");
    gridControl.classList.add("grid_control");

    const directions = [
        { class: "up-left", symbol: "↖", dir: "up-left" },
        { class: "up", symbol: "↑", dir: "up" },
        { class: "up-right", symbol: "↗", dir: "up-right" },
        { class: "left", symbol: "←", dir: "left" },
        { class: "right", symbol: "→", dir: "right" },
        { class: "down-left", symbol: "↙", dir: "down-left" },
        { class: "down", symbol: "↓", dir: "down" },
        { class: "down-right", symbol: "↘", dir: "down-right" }
    ];

    let circle = document.createElement("div");
    circle.classList.add("circle");
    gridControl.appendChild(circle);

    directions.forEach(({ class: directionClass, symbol, dir }) => {
        let button = document.createElement("button");
        button.classList.add("direction-btn", directionClass);
        button.innerHTML = symbol;
        button.addEventListener("click", () => {
            gameBrain.moveGrid(dir);
        });
        circle.appendChild(button);
    });

    return gridControl;
}

