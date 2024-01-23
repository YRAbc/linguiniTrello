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
        console.log('Board added to OpfTechWorkspace:', board.getBoardName(), board.getBoardID());
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
    
    printBoards() {
        console.log(`Boards in ${this.name} Workspace:`);
        
        if (this.boards.length === 0) {
            console.log('No boards in the workspace.');
        } else {
            this.boards.forEach((board, index) => {
                console.log(`Board ${index + 1}:`);
                console.log(`  Name: ${board.getBoardName()}`);
                console.log(`  ID: ${board.getBoardID()}`);
            });
        }
    }
    
}

export default Workspace;