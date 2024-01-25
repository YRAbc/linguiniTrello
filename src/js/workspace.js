// workspace.js
// Made by Yoann Raton, 19/01/2024

import Board from './board.js';
import List from './list.js';
import Card from './card.js';

class Workspace {
    constructor(name) {
        this.name = name;
        this.boards = [];
    }

    addBoard(board) {
        if (this.boards.length >= 3) {
            console.warn('Cannot add more than three boards to OpfTechWorkspace.');
            return;
        }
    
        const existingIndex = this.boards.findIndex(existingBoard => existingBoard.getBoardID() === board.getBoardID());
    
        if (existingIndex === -1) {
            // Board with the same ID is not already in the workspace
            this.boards.push(board);
            console.log('Board added to OpfTechWorkspace:', board.getBoardName(), board.getBoardID());
        } else {
            // Replace the existing board with the new one
            this.boards[existingIndex] = board;
            console.log('Board replaced in OpfTechWorkspace:', board.getBoardName(), board.getBoardID());
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
                                
                                // Print items for the current card
                                const items = card.getItems();
                                if (items.length === 0) {
                                    console.log('            No items in this card.');
                                } else {
                                    console.log('            Items:');
                                    items.forEach((item, itemIndex) => {
                                        console.log(`              Item ${itemIndex + 1}:`);
                                        console.log(`                Property 1: ${item.property1}`);
                                        console.log(`                Property 2: ${item.property2}`);
                                        // Add more properties as needed
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }
    

    getBoardsInfo() {
        // Return an array containing information about each board
        return this.boards.map(board => ({
            id: board.getBoardID(),
            name: board.getBoardName(),
            lists: board.getLists().map(list => ({
                id: list.getListID(),
                name: list.getListName(),
                cards: list.getListCards().map(card => ({
                    id: card.id,
                    name: card.name,
                })),
            })),
        }));
    }

    // Method to get the list of boards in the workspace
    getBoards() {
        return this.boards;
    }

    // Method to get a board by ID
    getBoardById(boardId) {
        return this.boards.find(board => board.getBoardID() === boardId) || null;
    }

}

export default Workspace;