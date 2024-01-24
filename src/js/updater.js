// updater.js
// Made by Yoann Raton, 24/01/2024

import Workspace from './workspace.js';
import Ruler from './ruler.js';

class Updater {
    constructor(workspace, ruler) {
        this.workspace = workspace;
        this.ruler = ruler;
        // You might want to include other initialization logic
    }

    // Method to check for modifications based on rules
    checkForModifications(t) {
        // Iterate through each board in the workspace
        this.workspace.getBoards().forEach((board) => {
            // Retrieve the latest Trello data for the board
            t.get(`/boards/${board.getBoardID()}/?cards=all&lists=all`)
                .then((latestBoardData) => {
                    // Compare the latest data with the existing data in opfwsp
                    if (this.boardDataChanged(board, latestBoardData)) {
                        // Logic to perform when board data needs to be updated
                        console.log(`Board with ID ${board.getBoardID()} needs to be updated.`);
                    }
                })
                .catch((error) => {
                    console.error(`Error fetching latest board data for board ${board.getBoardID()}:`, error);
                });
        });
    }

    // Method to compare the latest Trello data with existing data in opfwsp
    boardDataChanged(existingBoard, latestBoardData) {
        // Compare the number of boards
        if (existingBoard.getLists().length !== latestBoardData.lists.length) {
            return true;
        }

        // Iterate through each list in the existing board
        for (let i = 0; i < existingBoard.getLists().length; i++) {
            const existingList = existingBoard.getLists()[i];
            const latestList = latestBoardData.lists[i];

            // Compare the number of cards in the list
            if (existingList.getListCards().length !== latestList.cards.length) {
                return true;
            }

            // Iterate through each card in the existing list
            for (let j = 0; j < existingList.getListCards().length; j++) {
                const existingCard = existingList.getListCards()[j];
                const latestCard = latestList.cards[j];

                // Compare the number of items in the card
                if (existingCard.getItems().length !== latestCard.items.length) {
                    return true;
                }

                // Iterate through each item in the existing card
                for (let k = 0; k < existingCard.getItems().length; k++) {
                    const existingItem = existingCard.getItems()[k];
                    const latestItem = latestCard.items[k];

                    // Compare properties of the item (adjust based on your item structure)
                    if (
                        existingItem.property1 !== latestItem.property1 ||
                        existingItem.property2 !== latestItem.property2
                        // Add more properties as needed
                    ) {
                        return true;
                    }
                }
            }
        }

        // If no differences are found, return false
        return false;
    }

}

export default Updater;
