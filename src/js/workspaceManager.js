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
            const existingBoardData = await this.rqtInv.getBoard(board.getBoardId());
    
            // Compare Id and name of boards
            if (this.boardDataChanged(existingBoardData, board)) {
                console.log(`Board with Id ${board.getBoardId()} needs to be updated.`);

                    //  -> BOARD MODIFIED
                    this.trellowsp.boardModifiedRule(board.getBoardId())
                    this.updateWorkspace();
            }
    
            // Get existing lists for the board
            const existingLists = await this.rqtInv.getBoardLists(board.getBoardId());
    
            // Compare lists for each board
            for (const list of board.getLists()) {
                const existingListData = existingLists.find(existingList => existingList.id === list.getListId());
    
                if (!existingListData) {
                    console.log(`List with Id ${list.getListId()}, (${list.getListName()}) in Board ${board.getBoardId()} has been removed.`);

                        //  -> LIST REMOVE
                        this.trellowsp.listRemovedFromBoardRule(list.getListId(), board.getBoardId());
                        this.updateWorkspace();

                } else {
                    if (this.listDataChanged(existingListData, list)) {
                        console.log(`List with Id ${list.getListId()} in Board ${board.getBoardId()} needs to be updated.`);
                        
                            //  -> LIST MODIFIED
                            this.trellowsp.listModifiedInBoardRule(list.getListId(), board.getBoardId());
                            this.updateWorkspace();
                    }
                }
    
                // Get existing cards for the list and the board
                const existingListCards = await this.rqtInv.getListCards(list.getListId());
                const existingBoardCards = await this.rqtInv.getBoardCards(board.getBoardId());

                for (const card of list.getCards()) {
                    const existingInList = existingListCards.find(existingCard => existingCard.id === card.getCardId());
                    const existingInBoard = existingBoardCards.some(existingCard => existingCard.id === card.getCardId());

                    if (!existingInBoard && !existingInList) {
                        // Card is removed
                        console.log(`Card with Id ${card.getCardId()}, (${card.getCardName()}) in List ${list.getListId()} has been removed.`);

                            //  -> CARD REMOVED
                            this.trellowsp.cardRemovedFromListRule(card.getCardId(), list.getListId(), board.getBoardId());
                            this.updateWorkspace();
                    } 
                    
                    else if (!existingInList) {
                        // Card has been moved
                        const targetList = await this.rqtInv.getListFromCard(card.getCardId());
                        console.log(`Card with Id ${card.getCardId()}, (${card.getCardName()}) has been moved from List ${list.getListName()} to List ${targetList.name}`);

                            //  -> CARD MOVED
                            this.trellowsp.cardMovedToListRule(card.getCardId(), list.getListId(), board.getBoardId());
                            this.updateWorkspace();
                    }

                    else if (this.cardDataChanged(existingInList, card)) {
                        // Card needs to be updated
                        console.log(`Card with Id ${card.getCardId()} in List ${list.getListId()} needs to be updated.`);

                            //  -> CARD MODIFIED
                            this.trellowsp.cardModifiedInListRule(card.getCardId(), list.getListId(), board.getBoardId());
                            this.updateWorkspace();
                    } 
                    
                }

                // Check for added cards
                for (const existingCard of existingListCards) {
                    const cardStillExists = board.getCards().some(card => card.getCardId() === existingCard.id);
                    if (!cardStillExists) {
                        console.log(`Card with Id ${existingCard.id}, (${existingCard.name}) in List ${list.getListId()} is a new card.`);

                            //  -> CARD ADDED
                            this.trellowsp.cardAddedToListRule(existingCard.id, list.getListId(), board.getBoardId());
                            this.updateWorkspace();
                    }
                }
            }
    
            // Check for added lists
            for (const existingList of existingLists) {
                const listStillExists = board.getLists().some(list => list.getListId() === existingList.id);
                if (!listStillExists) {
                    console.log(`List with Id ${existingList.id}, (${existingList.name}) in Board ${board.getBoardId()} is a new list.`);

                        //  -> LIST ADDED
                        this.trellowsp.listAddedToBoardRule(existingList.id, board.getBoardId());
                        this.updateWorkspace();
                }
            }
        }

        //
    }
    

    // Method to compare the Id and name of the latest Trello board with existing data in opfwsp
    boardDataChanged(existingBoard, latestBoardData) {
        const IdChanged = existingBoard.id !== latestBoardData.getBoardId();
        const nameChanged = existingBoard.name !== latestBoardData.getBoardName();

        if (IdChanged || nameChanged) {
            //console.log(`Board Name change - ${existingBoard.name} from ${latestBoardData.getBoardName()}`);
        }

        return IdChanged || nameChanged;
    }

    // Method to compare the Id and name of the latest Trello list with existing data in opfwsp
    listDataChanged(existingList, latestListData) {
        const IdChanged = existingList.id !== latestListData.getListId();
        const nameChanged = existingList.name !== latestListData.getListName();

        if (IdChanged || nameChanged) {
            //console.log(`List Name change - ${existingList.name} from ${latestListData.getListName()}`);
        }

        return IdChanged || nameChanged;
    }

    // Method to compare the Id and name of the latest Trello card with existing data in opfwsp
    cardDataChanged(existingCard, latestCardData) {
        const IdChanged = existingCard.id !== latestCardData.getCardId();
        const nameChanged = existingCard.name !== latestCardData.getCardName();

        if (IdChanged || nameChanged) {
            //console.log(`Card Name Change -  ${existingCard.name} from ${latestCardData.getCardName()}`);
        }

        //add additionnal modifications for card updates

        return IdChanged || nameChanged;
    }

    //Update Workspace
    async updateWorkspace() {
        try {
            // Iterate through each board in the workspace
            for (const board of this.opfvwsp.getBoards()) {
                try {
                    // Get the existing data for the board from opfwsp
                    const existingBoardData = await this.rqtInv.getBoard(board.getBoardId());
    
                    // Ensure that existingBoardData is defined before proceeding
                    if (!existingBoardData) {
                        console.error(`Board data is undefined for boardId: ${board.getBoardId()}`);
                        continue;
                    }
    
                    // Get existing lists for the board
                    const existingLists = await this.rqtInv.getBoardLists(board.getBoardId());
                    const listObjects = [];
    
                    for (const list of existingLists) {
                        try {
                            // Ensure that list is defined before creating listObj
                            if (!list) {
                                console.error(`List data is undefined for boardId: ${board.getBoardId()}`);
                                continue;
                            }
    
                            // Create a new List object for each Trello list
                            const listObj = new VList(list.id, list.name || 'Unknown List');
    
                            const existingListCards = await this.rqtInv.getListCards(listObj.getListId());
    
                            for (const card of existingListCards) {
                                try {
                                    // Extract items from Trello card if available
                                    const items = card.items || [];
    
                                    // Create a Card object for each Trello card
                                    const cardObj = new VCard(card.id, card.name, listObj.getListId(), listObj.getListName() || 'Unknown List', items);
    
                                    // Add the card object to the list object
                                    listObj.addCard(cardObj);
                                    //console.log("Card added to list, ", cardObj.getCardId(), ", ", cardObj.getCardName());
                                } catch (cardError) {
                                    console.error('Error processing card:', cardError.response ? cardError.response.data : cardError.message);
                                    // Handle or log the card processing error
                                }
                            }
    
                            // Add the list object to the array
                            listObjects.push(listObj);
                            //console.log("List added to Board, ", listObj.getListId(), ", ", listObj.getListName());
                        } catch (listError) {
                            console.error('Error processing list:', listError.response ? listError.response.data : listError.message);
                            // Handle or log the list processing error
                        }
                    }
    
                    // Create a Board object and add it to opfwsp
                    const boardObj = new VBoard(existingBoardData.id, existingBoardData.name, listObjects);
                    this.opfvwsp.updateBoard(boardObj);
                } catch (boardError) {
                    console.error('Error processing board:', boardError.response ? boardError.response.data : boardError.message);
                    // Handle or log the board processing error
                }
            }
    
            console.log("wksp Updated");
        } catch (error) {
            console.error('Error updating workspace:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
    

}

export default WorkspaceManager;
