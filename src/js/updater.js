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
    
            // Get existing lists for the board
            const existingLists = await this.getter.getLists(board.getBoardID());
    
            // Compare lists for each board
            for (const list of board.getLists()) {
                const existingListData = existingLists.find(existingList => existingList.id === list.getListID());
    
                if (!existingListData) {
                    console.log(`List with ID ${list.getListID()} in Board ${board.getBoardID()} is a new list.`);
                } else {
                    if (this.listDataChanged(existingListData, list)) {
                        console.log(`List with ID ${list.getListID()} in Board ${board.getBoardID()} needs to be updated.`);
                    }
                }
    
                // Get existing cards for the list
                const existingCards = await this.getter.getCards(list.getListID());
    
                // Compare cards for each list
                for (const card of list.getCards()) {
                    const existingCardData = existingCards.find(existingCard => existingCard.id === card.getCardID());
    
                    if (!existingCardData) {
                        console.log(`Card with ID ${card.getCardID()} in List ${list.getListID()} is a new card.`);
                    } else {
                        if (this.cardDataChanged(existingCardData, card)) {
                            console.log(`Card with ID ${card.getCardID()} in List ${list.getListID()} needs to be updated.`);
                        }
                    }
                }
    
                // Check for removed cards
                for (const existingCard of existingCards) {
                    const cardStillExists = list.getCards().some(card => card.getCardID() === existingCard.getCardID());
                    if (!cardStillExists) {
                        console.log(`Card with ID ${existingCard.getCardID()} in List ${list.getListID()} has been removed.`);
                    }
                }
            }
    
            // Check for removed lists
            for (const existingList of existingLists) {
                const listStillExists = board.getLists().some(list => list.getListID() === existingList.getListID());
                if (!listStillExists) {
                    console.log(`List with ID ${existingList.getListID()} in Board ${board.getBoardID()} has been removed.`);
                }
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
