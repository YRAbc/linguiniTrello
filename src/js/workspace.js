// main.js
// Made by Yoann Raton, 19/01/2024

import Board from './board.js';

class Workspace {
    constructor(name) {
        this.name = name;
        this.boards = [];
    }

    addBoard(board) {
        this.boards.push(board);
        console.log(`Added Board Name: ${board.boardName}, Board ID: ${board.boardID} to Workspace: ${this.name}.`);
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

    printAllBoardsData() {
        console.log(`Workspace Name: ${this.name}`);

        this.boards.forEach(board => {
            console.log(`Board Name: ${board.name}, Board ID: ${board.id}`);
        });
    }

}

const opfwsp = new Workspace("OpfTechWorkspace");
