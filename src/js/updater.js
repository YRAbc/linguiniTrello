// updater.js
// Made by Yoann Raton, 24/01/2024

import Workspace from './workspace.js';
import Board from './board.js';
import List from './list.js';
import Card from './card.js';
import Ruler from './ruler.js';
import Post from './post.js';
import Get from './get.js';

class Updater {
    constructor(workspace, ruler, getter, poster) {
        this.workspace = workspace;
        this.ruler = ruler;
        this.getter = getter;
        this.poster = poster;
    }

    async checkForModifications() {
        // Iterate through each board in the workspace
        for (const board of this.workspace.getBoards()) {
            // Get the existing data for the board from opfwsp
            const existingBoardData = await this.getter.getBoard(board.getBoardID());

            // Compare ID and name of boards
            if (this.boardDataChanged(existingBoardData, board)) {
                console.log(`Board with ID ${board.getBoardID()} needs to be updated.`);
            }

            // Compare lists for each board
            for (const list of board.getLists()) {
                const existingListData = await this.getter.getList(list.getListID());
                if (this.listDataChanged(existingListData, list)) {
                    console.log(`List with ID ${list.getListID()} in Board ${board.getBoardID()} needs to be updated.`);
                }

                // Compare cards for each list
                for (const card of list.getCards()) {
                    const existingCardData = await this.getter.getCard(card.getCardID());
                    if (this.cardDataChanged(existingCardData, card)) {
                        console.log(`Card with ID ${card.getCardID()} in List ${list.getListID()} needs to be updated.`);
                    }
                }

                // Check for new cards in Trello data
                const newCardCount = (existingListData.cards || []).length - list.getCards().length;
                console.log(`Cards number var in ${list.getListID()}: ${newCardCount} cards`);
                if (newCardCount > 0) {
                    console.log(`New cards added to List ${list.getListID()}: ${newCardCount} cards`);
                }
            }

            // Check for new lists in Trello data
            const newListCount = (existingBoardData.lists || []).length - board.getLists().length;
            console.log(`list number var in ${board.getBoardID()}: ${newListCount} lists`);
            if (newListCount > 0) {
                console.log(`New lists added to Board ${board.getBoardID()}: ${newListCount} lists`);
            }
        }
    }

    // Method to compare the ID and name of the latest Trello board with existing data in opfwsp
    boardDataChanged(existingBoard, latestBoardData) {
        const idChanged = existingBoard.id !== latestBoardData.getBoardID();
        const nameChanged = existingBoard.name !== latestBoardData.getBoardName();

        if (idChanged || nameChanged) {
            console.log(`Board ID or name changed: ID - ${existingBoard.id} to ${latestBoardData.getBoardID()}, Name - ${existingBoard.name} to ${latestBoardData.getBoardName()}`);
        }

        return idChanged || nameChanged;
    }

    // Method to compare the ID and name of the latest Trello list with existing data in opfwsp
    listDataChanged(existingList, latestListData) {
        const idChanged = existingList.id !== latestListData.getListID();
        const nameChanged = existingList.name !== latestListData.getListName();

        if (idChanged || nameChanged) {
            console.log(`List ID or name changed: ID - ${existingList.id} to ${latestListData.getListID()}, Name - ${existingList.name} to ${latestListData.getListName()}`);
        }

        return idChanged || nameChanged;
    }

    // Method to compare the ID and name of the latest Trello card with existing data in opfwsp
    cardDataChanged(existingCard, latestCardData) {
        const idChanged = existingCard.id !== latestCardData.getCardID();
        const nameChanged = existingCard.name !== latestCardData.getCardName();

        if (idChanged || nameChanged) {
            console.log(`Card ID or name changed: ID - ${existingCard.id} to ${latestCardData.getCardID()}, Name - ${existingCard.name} to ${latestCardData.getCardName()}`);
        }

        return idChanged || nameChanged;
    }
}

export default Updater;
