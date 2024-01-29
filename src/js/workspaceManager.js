// workspaceManager.js
// Made by Yoann Raton, 24/01/2024

import VWorkspace from './virtualWorkspace/vworkspace.js';
import VBoard from './virtualWorkspace/vboard.js';
import VList from './virtualWorkspace/vlist.js';
import VCard from './virtualWorkspace/vcard.js';

import TrelloServerWorkspace from './trelloServerWorkspace/trelloServerWorkspace.js';
import RequestInventory from './trelloServerWorkspace/requestInventory.js';
import IdsConfigWorkspace from './idsWorkspace/idsConfigWorkspace.js';

class WorkspaceManager {

    constructor() {
        this.config = new IdsConfigWorkspace();
        this.opfvwsp = new VWorkspace("OPF Tech Virtual Workspace", this.config);
        this.trellowsp = new TrelloServerWorkspace("OPF Tech Trello Workspace", this.config)
        this.rqtInv = new RequestInventory();
    }

    async checkForModifications() {
        // Iterate through each board in the workspace
        for (const board of this.opfvwsp.getBoards()) {
            // Get the existing data for the board from opfwsp
            const existingBoardData = await this.rqtInv.getBoard(board.getBoardID());
    
            // Compare ID and name of boards
            if (this.boardDataChanged(existingBoardData, board)) {
                console.log(`Board with ID ${board.getBoardID()} needs to be updated.`);

                    //  -> BOARD MODIFIED
                    this.trellowsp.boardModifiedRule(board.getBoardID())
                    this.updateWorkspace();
            }
    
            // Get existing lists for the board
            const existingLists = await this.rqtInv.getBoardLists(board.getBoardID());
    
            // Compare lists for each board
            for (const list of board.getLists()) {
                const existingListData = existingLists.find(existingList => existingList.id === list.getListID());
    
                if (!existingListData) {
                    console.log(`List with ID ${list.getListID()}, (${list.getListName()}) in Board ${board.getBoardID()} has been removed.`);

                        //  -> LIST REMOVE
                        this.trellowsp.listRemovedFromBoardRule(list.getListID(), board.getBoardID());
                        this.updateWorkspace();

                } else {
                    if (this.listDataChanged(existingListData, list)) {
                        console.log(`List with ID ${list.getListID()} in Board ${board.getBoardID()} needs to be updated.`);
                        
                            //  -> LIST MODIFIED
                            this.trellowsp.listModifiedInBoardRule(list.getListID(), board.getBoardID());
                            this.updateWorkspace();
                    }
                }
    
                // Get existing cards for the list and the board
                const existingListCards = await this.rqtInv.getListCards(list.getListID());
                const existingBoardCards = await this.rqtInv.getBoardCards(board.getBoardID());

                for (const card of list.getCards()) {
                    const existingInList = existingListCards.find(existingCard => existingCard.id === card.getCardID());
                    const existingInBoard = existingBoardCards.some(existingCard => existingCard.id === card.getCardID());

                    if (!existingInBoard && !existingInList) {
                        // Card is removed
                        console.log(`Card with ID ${card.getCardID()}, (${card.getCardName()}) in List ${list.getListID()} has been removed.`);

                            //  -> CARD REMOVED
                            this.trellowsp.cardRemovedFromListRule(card.getCardID(), list.getListID(), board.getBoardID());
                            this.updateWorkspace();
                    } 
                    
                    else if (!existingInList) {
                        // Card has been moved
                        const targetList = await this.rqtInv.getListFromCard(card.getCardID());
                        console.log(`Card with ID ${card.getCardID()}, (${card.getCardName()}) has been moved from List ${list.getListName()} to List ${targetList.name}`);

                            //  -> CARD MOVED
                            this.trellowsp.cardMovedToListRule(card.getCardID(), list.getListID(), board.getBoardID());
                            this.updateWorkspace();
                    }

                    else if (this.cardDataChanged(existingInList, card)) {
                        // Card needs to be updated
                        console.log(`Card with ID ${card.getCardID()} in List ${list.getListID()} needs to be updated.`);

                            //  -> CARD MODIFIED
                            this.trellowsp.cardModifiedInListRule(card.getCardID(), list.getListID(), board.getBoardID());
                            this.updateWorkspace();
                    } 
                    
                }

                // Check for added cards
                for (const existingCard of existingListCards) {
                    const cardStillExists = board.getCards().some(card => card.getCardID() === existingCard.id);
                    if (!cardStillExists) {
                        console.log(`Card with ID ${existingCard.id}, (${existingCard.name}) in List ${list.getListID()} is a new card.`);

                            //  -> CARD ADDED
                            this.trellowsp.cardAddedToListRule(existingCard.id, list.getListID(), board.getBoardID());
                            this.updateWorkspace();
                    }
                }
            }
    
            // Check for added lists
            for (const existingList of existingLists) {
                const listStillExists = board.getLists().some(list => list.getListID() === existingList.id);
                if (!listStillExists) {
                    console.log(`List with ID ${existingList.id}, (${existingList.name}) in Board ${board.getBoardID()} is a new list.`);

                        //  -> LIST ADDED
                        this.trellowsp.listAddedToBoardRule(existingList.id, board.getBoardID());
                        this.updateWorkspace();
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

    async updateWorkspace() {

        // Iterate through each board in the workspace
        for (const board of this.opfvwsp.getBoards()) {
            // Get the existing data for the board from opfwsp
            const existingBoardData = await this.rqtInventory.getBoard(board.getBoardID());
    
            // Get existing lists for the board
            const existingLists = await this.rqtInventory.getBoardLists(board.getBoardID());
    
            const listObjects = [];
    
            for (const list of existingLists) {
                // Create a new List object for each Trello list
                const listObj = new VList(list.id, list.name || 'Unknown List');
    
                const existingListCards = await this.rqtInventory.getListCards(listObj.getListID());
    
                for (const card of existingListCards) {
                    // Extract items from Trello card if available
                    const items = card.items || [];
    
                    // Create a Card object for each Trello card
                    const cardObj = new VCard(card.id, card.name, listObj.id, listObj.name || 'Unknown List', items);
    
                    // Add the card object to the list object
                    listObj.addCard(cardObj);
                }
    
                // Add the list object to the array
                listObjects.push(listObj);
            }
    
            // Create a Board object and add it to opfwsp
            const boardObj = new VBoard(existingBoardData.id, existingBoardData.name, listObjects);
            this.workspace.updateBoard(boardObj);
        }
    }    

}

export default WorkspaceManager;
