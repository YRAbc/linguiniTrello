// workspace.js
// Made by Yoann Raton, 19/01/2024

import Board from './board.js';

class Workspace {
    constructor(name) {
        this.name = name;
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

}

const opfwsp = new Workspace("OpfTechWorkspace");
