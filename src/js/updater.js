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
                    console.log(`List with ID ${list.getListID()}, (${list.getListName()}) in Board ${board.getBoardID()} has been removed.`);
                } else {
                    if (this.listDataChanged(existingListData, list)) {
                        console.log(`List with ID ${list.getListID()} in Board ${board.getBoardID()} needs to be updated.`);
                    }
                }
    
                // Get existing cards for the list and the board
                const existingListCards = await this.getter.getListCards(list.getListID());
                const existingBoardCards = await this.getter.getBoardCards(board.getBoardID());

                for (const card of list.getCards()) {
                    const existingInList = existingListCards.find(existingCard => existingCard.id === card.getCardID());
                    const existingInBoard = existingBoardCards.some(existingCard => existingCard.id === card.getCardID());

                    if (!existingInBoard && !existingInList) {
                        // Card is removed
                        console.log(`Card with ID ${card.getCardID()}, (${card.getCardName()}) in List ${list.getListID()} has been removed.`);
                    } 
                    
                    else if (!existingInList) {
                        // Card has been moved
                        const targetList = await this.getter.getListFromCard(card.getCardID());
                        console.log(`Card with ID ${card.getCardID()}, (${card.getCardName()}) has been moved from List ${list.getListName()} to List ${targetList.getListName()}`);
                    }

                    else if (this.cardDataChanged(existingInList, card)) {
                        // Card needs to be updated
                        console.log(`Card with ID ${card.getCardID()} in List ${list.getListID()} needs to be updated.`);
                    } 
                    
                }

                // Check for added cards
                for (const existingCard of existingListCards) {
                    const cardStillExists = board.getCards().some(card => card.getCardID() === existingCard.id);
                    if (!cardStillExists) {
                        console.log(`Card with ID ${existingCard.id}, (${existingCard.name}) in List ${list.getListID()} is a new card.`);
                    }
                }
            }
    
            // Check for added lists
            for (const existingList of existingLists) {
                const listStillExists = board.getLists().some(list => list.getListID() === existingList.id);
                if (!listStillExists) {
                    console.log(`List with ID ${existingList.id}, (${existingList.name}) in Board ${board.getBoardID()} is a new list.`);
                }
            }
        }

        //
    }
    

    // Method to compare the ID and name of the latest Trello board with existing data in opfwsp
    boardDataChanged(existingBoard, latestBoardData) {
        const idChanged = existingBoard.id !== latestBoardData.getBoardID();
        const nameChanged = existingBoard.name !== latestBoardData.getBoardName();

        if (idChanged || nameChanged) {
            console.log(`Board Name change - ${existingBoard.name} from ${latestBoardData.getBoardName()}`);
        }

        return idChanged || nameChanged;
    }

    // Method to compare the ID and name of the latest Trello list with existing data in opfwsp
    listDataChanged(existingList, latestListData) {
        const idChanged = existingList.id !== latestListData.getListID();
        const nameChanged = existingList.name !== latestListData.getListName();

        if (idChanged || nameChanged) {
            console.log(`List Name change - ${existingList.name} from ${latestListData.getListName()}`);
        }

        return idChanged || nameChanged;
    }

    // Method to compare the ID and name of the latest Trello card with existing data in opfwsp
    cardDataChanged(existingCard, latestCardData) {
        const idChanged = existingCard.id !== latestCardData.getCardID();
        const nameChanged = existingCard.name !== latestCardData.getCardName();

        if (idChanged || nameChanged) {
            console.log(`Card Name Change -  ${existingCard.name} from ${latestCardData.getCardName()}`);
        }

        //add additionnal modifications for card updates

        return idChanged || nameChanged;
    }

    updateWorkspace(){

        //Code to create
        console.log("Update opfwsp");
    }
}

export default Updater;
