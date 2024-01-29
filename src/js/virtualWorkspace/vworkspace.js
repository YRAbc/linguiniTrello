// workspace.js
// Made by Yoann Raton, 19/01/2024

import VBoard from './vboard.js';
import VList from './vlist.js';
import VCard from './vcard.js';
import IdsConfigWorkspace from '././idsWorkspace/idsConfigWorkspace.js';

class VWorkspace {
    constructor(name, config) {
        this.id = "1";
        this.name = name;
        this.boards = [];  
        this.boards.push(new VBoard(config.opfBoardId, "BOARD 1", []));
        this.boards.push(new VBoard(config.sidBoardId, "BOARD 2", []));
        this.boards.push(new VBoard(config.techBoardId, "BOARD 3", []));

    }

    // Getter method to get the workspace id
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

    // Method to display workspace data
    display() {
        console.log(`Workspace ID: ${this.getWorkspaceId()}`);
        console.log(`Workspace Name: ${this.getName()}`);
        console.log("Boards:");
        this.getBoards().forEach((board, index) => {
            console.log(`  ${index + 1}. ${board}`);
        });
    }
}

export default VWorkspace;