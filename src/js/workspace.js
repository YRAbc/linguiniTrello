// workspace.js
// Made by Yoann Raton, 19/01/2024

import Board from './board.js';

class Workspace {
    constructor(name) {
        this.name = name;
        this.boards = [];
    }

    addBoard(board) {
        // Check for duplicate board by comparing board IDs
        const duplicateBoard = this.boards.find(existingBoard => existingBoard.getBoardID() === board.getBoardID());
    
        if (!duplicateBoard) {
          this.boards.push(board);
          console.log(`Board ${board.getBoardName()} added to ${this.name} workspace.`);
        } else {
          // Show confirmation dialog before adding a duplicate board
          window.TrelloPowerUp.confirm({
            title: 'Duplicate Board',
            text: `Board ${board.getBoardName()} is already in ${this.name} workspace. Do you want to add it again?`,
            confirm: 'Add',
            cancel: 'Cancel',
          })
            .then((result) => {
              if (result) {
                this.boards.push(board);
                console.log(`Board ${board.getBoardName()} added to ${this.name} workspace.`);
              } else {
                console.log(`Board ${board.getBoardName()} was not added to ${this.name} workspace.`);
              }
            });
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
    
                // Print lists for the current board
                const lists = board.getLists();
                if (lists.length === 0) {
                    console.log('  No lists on this board.');
                } else {
                    console.log('  Lists:');
                    lists.forEach((list, listIndex) => {
                        console.log(`    List ${listIndex + 1}:`);
                        console.log(`      Name: ${list.getListName()}`);
                        console.log(`      ID: ${list.getListId()}`);
                        console.log('      Cards:');
                        const cards = list.getListCards();
                        if (cards.length === 0) {
                            console.log('        No cards in this list.');
                        } else {
                            cards.forEach((card, cardIndex) => {
                                console.log(`        Card ${cardIndex + 1}:`);
                                console.log(`          Name: ${card.name}`);
                                console.log(`          ID: ${card.id}`);
                            });
                        }
                    });
                }
            });
        }
    }
    
}

export default Workspace;