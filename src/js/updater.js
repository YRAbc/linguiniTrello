// updater.js
// Made by Yoann Raton, 24/01/2024

import Workspace from './workspace.js';
import Board from './board.js';
import List from './list.js';
import Card from './card.js';
import Ruler from './ruler.js';

class Updater {
    constructor(workspace, ruler) {
        this.workspace = workspace;
        this.ruler = ruler;
        // You might want to include other initialization logic
    }

    checkForModifications() {
        // Iterate through each board in the workspace
        this.workspace.getBoards().forEach((board) => {
            // Get the existing data for the board from opfwsp
            const existingBoardData = this.workspace.getBoardById(board.getBoardID());
    
            // Compare the existing data with the latest Trello data
            if (this.boardDataChanged(existingBoardData, board)) {
                // Logic to perform when board data needs to be updated
                console.log(`Board with ID ${board.getBoardID()} needs to be updated.`);
            }
        });
    }

    // Method to compare the latest Trello data with existing data in opfwsp
    boardDataChanged(existingBoard, latestBoardData) {
        // Compare the number of boards
        if (existingBoard.getLists().length !== latestBoardData.lists.length) {
            console.log('Number of lists in the board changed.');
            return true;
        }

        // Iterate through each list in the existing board
        for (let i = 0; i < existingBoard.getLists().length; i++) {
            const existingList = existingBoard.getLists()[i];
            const latestList = latestBoardData.lists[i];

            // Check if both existingList and latestList are defined
            if (!existingList || !latestList) {
                console.log('List data is undefined.');
                return true; // Consider data changed if either is undefined
            }

            // Compare the name of the list
            if (existingList.getListName() !== latestList.name) {
                console.log(`List name changed from '${existingList.getListName()}' to '${latestList.name}'.`);
                return true;
            }

            // Compare the number of cards in the list
            if (
                !existingList.getListCards() ||
                !latestList.cards ||
                existingList.getListCards().length !== latestList.cards.length
            ) {
                console.log(`Number of cards in the list changed. Existing: ${existingList.getListCards().length}, Latest: ${latestList.cards.length}`);
                return true;
            }

            // Iterate through each card in the existing list
            for (let j = 0; j < existingList.getListCards().length; j++) {
                const existingCard = existingList.getListCards()[j];
                const latestCard = latestList.cards[j];

                // Check if both existingCard and latestCard are defined
                if (!existingCard || !latestCard) {
                    console.log('Card data is undefined.');
                    return true; // Consider data changed if either is undefined
                }

                // Compare the number of items in the card
                if (
                    !existingCard.getItems() ||
                    !latestCard.items ||
                    existingCard.getItems().length !== latestCard.items.length
                ) {
                    console.log('Number of items in the card changed.');
                    return true;
                }

                // Iterate through each item in the existing card
                for (let k = 0; k < existingCard.getItems().length; k++) {
                    const existingItem = existingCard.getItems()[k];
                    const latestItem = latestCard.items[k];

                    // Check if both existingItem and latestItem are defined
                    if (!existingItem || !latestItem) {
                        console.log('Item data is undefined.');
                        return true; // Consider data changed if either is undefined
                    }

                    // Compare properties of the item (adjust based on your item structure)
                    if (
                        existingItem.property1 !== latestItem.property1 ||
                        existingItem.property2 !== latestItem.property2
                        // Add more properties as needed
                    ) {
                        console.log('Item properties changed.');
                        return true;
                    }
                }
            }
        }

        // If no differences are found, return false
        console.log('No differences found.');
        return false;
    }

}

export default Updater;
