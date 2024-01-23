// workspace.js
// Made by Yoann Raton, 19/01/2024

import Board from './board.js';

class Workspace {
    constructor(name) {
        this.name = name;
        this.boards = [];
    }

    addBoard(board) {
        const existingIndex = this.boards.findIndex(existingBoard => existingBoard.getBoardID() === board.getBoardID());
    
        if (existingIndex === -1) {
            // Board with the same ID is not already in the workspace
            this.boards.push(board);
            console.log('Board added to OpfTechWorkspace:', board.getBoardName(), board.getBoardID());
        } else {
            console.warn('Board with the same ID already exists in OpfTechWorkspace.');
        }
    }
    
    removeBoardById(boardId) {
        const index = this.boards.findIndex(board => board.getBoardID() === boardId);
    
        if (index !== -1) {
            // If the board is found in the array, remove it
            this.boards.splice(index, 1);
            console.log('Board removed from OpfTechWorkspace:', boardId);
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