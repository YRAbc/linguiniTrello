// main.js
// Made by Yoann Raton, 19/01/2024

class Workspace {
    constructor() {
        this.name = "OpfWorkspace";
        this.boards = [];
    }

    addBoard(board) {
        this.boards.push(board);
    }

    removeBoardById(boardId) {
        const index = this.boards.findIndex(board => board.id === boardId);

        if (index !== -1) {
            // If the board is found in the array, remove it
            this.boards.splice(index, 1);
        } else {
            console.warn("Board not found in the workspace.");
        }
    }

    getBoards() {
        return this.boards;
    }

    printAllBoardsData() {
        console.log(`Workspace Name: ${this.name}`);

        this.boards.forEach(board => {
            console.log(`Board Name: ${board.name}, Board ID: ${board.id}`);
        });
    }

}