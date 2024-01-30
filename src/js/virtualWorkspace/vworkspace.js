// workspace.js
// Made by Yoann Raton, 19/01/2024

import VBoard from './vboard.js';
import VList from './vlist.js';
import VCard from './vcard.js';
import IdsConfigWorkspace from '../idsWorkspace/idsConfigWorkspace.js';

class VWorkspace {
    constructor(name, config) {
        this.id = "1";
        this.name = name;
        this.boards = [];  
        this.boards.push(new VBoard(config.opfBoardId, "OPF Todo List", []));
        this.boards.push(new VBoard(config.sidBoardId, "Information System", []));
        this.boards.push(new VBoard(config.techBoardId, "OPF Tech - Task Board Test", []));

    }

    // Getter method to get the workspace Id
    getWorkspaceId() {
        return this.id;
    }

    // Getter method to get the workspace name
    getName() {
        return this.name;
    }

    // Getter method to get the list of boards in the workspace
    getBoards() {
        return this.boards;
    }

    updateBoard(newBoard) {
        const existingIndex = this.boards.findIndex(existingBoard => existingBoard.getBoardId() === newBoard.getBoardId());
    
        if (existingIndex !== -1) {
            // Replace the existing board with the new board
            this.boards.splice(existingIndex, 1, newBoard);
    
            console.log('Board updated successfully.');
        } else {
            console.error('Board not found in the workspace.');
            // Alternatively, you might want to throw an error or handle the case where the board is not found.
        }

        this.display();
    }
    

    // Method to display workspace data along with lists and cards in each board
    display() {
        console.log('Display Worksapce informations :');
        console.log(`Workspace Id: ${this.getWorkspaceId()}`);
        console.log(`Workspace Name: ${this.getName()}`);
        console.log("Boards:");

        this.getBoards().forEach((board, index) => {
            console.log(`  ${index + 1}. ${board.getName()}`); // Assuming there is a getName() method for the board

            // Display lists for the current board
            console.log("    Lists:");
            board.getLists().forEach((list, listIndex) => {
                console.log(`      ${listIndex + 1}. ${list.getName()}`); // Assuming there is a getName() method for the list

                // Display cards for the current list
                console.log("        Cards:");
                list.getCards().forEach((card, cardIndex) => {
                    console.log(`          ${cardIndex + 1}. ${card.getName()}`); // Assuming there is a getName() method for the card
                });
            });
        });
    }

}

export default VWorkspace;