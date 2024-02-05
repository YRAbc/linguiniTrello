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

        this.opfvwsp = new VWorkspace("OPF Tech Virtual Workspace", this.config);
        this.trellowsp = new TrelloServerWorkspace("OPF Tech Trello Workspace", this.config, this.opfvwsp)
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
                    await this.trellowsp.boardModifiedRule(board.getBoardId())
                    await this.updateWorkspace();
            }
    
            // Get existing lists for the board
            const existingLists = await this.rqtInv.getBoardLists(board.getBoardId());
    
            // Compare lists for each board
            for (const list of board.getLists()) {
                const existingListData = existingLists.find(existingList => existingList.id === list.getListId());
    
                if (!existingListData) {
                    console.log(`List with Id ${list.getListId()}, (${list.getListName()}) in Board ${board.getBoardId()} has been removed.`);

                        //  -> LIST REMOVE
                        await this.trellowsp.listRemovedFromBoardRule(list.getListId(), board.getBoardId());
                        await this.updateWorkspace();

                } else {
                    if (this.listDataChanged(existingListData, list)) {
                        console.log(`List with Id ${list.getListId()} in Board ${board.getBoardId()} needs to be updated.`);
                        
                            //  -> LIST MODIFIED
                            await this.trellowsp.listModifiedInBoardRule(list.getListId(), board.getBoardId());
                            await this.updateWorkspace();
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
                            await this.trellowsp.cardRemovedFromListRule(card.getCardId(), list.getListId(), board.getBoardId());
                            await this.updateWorkspace();
                    } 
                    
                    else if (!existingInList) {
                        // Card has been moved
                        const targetList = await this.rqtInv.getListFromCard(card.getCardId());
                        console.log(`Card with Id ${card.getCardId()}, (${card.getCardName()}) has been moved from List ${list.getListName()} to List ${targetList.name}`);

                            //  -> CARD MOVED
                            await this.trellowsp.cardMovedToListRule(card.getCardId(), list.getListId(), board.getBoardId());
                            await this.updateWorkspace();
                    }

                    else if (this.cardDataChanged(existingInList, card)) {
                        // Card needs to be updated
                        console.log(`Card with Id ${card.getCardId()} in List ${list.getListId()} needs to be updated.`);

                            //  -> CARD MODIFIED
                            this.trellowsp.cardModifiedInListRule(card.getCardId(), list.getListId(), board.getBoardId());
                            await this.updateDuplicates(existingInList, board.getBoardId());
                            await this.updateWorkspace();
                    } 
                    
                }

                // Check for added cards
                for (const existingCard of existingListCards) {
                    const cardStillExists = board.getCards().some(card => card.getCardId() === existingCard.id);
                    if (!cardStillExists) {
                        console.log(`Card with Id ${existingCard.id}, (${existingCard.name}) in List ${list.getListId()} is a new card.`);

                            //  -> CARD ADDED
                            await this.trellowsp.cardAddedToListRule(existingCard.id, list.getListId(), board.getBoardId());
                            await this.updateWorkspace();
                    }
                }
            }
    
            // Check for added lists
            for (const existingList of existingLists) {
                const listStillExists = board.getLists().some(list => list.getListId() === existingList.id);
                if (!listStillExists) {
                    console.log(`List with Id ${existingList.id}, (${existingList.name}) in Board ${board.getBoardId()} is a new list.`);

                        //  -> LIST ADDED
                        await this.trellowsp.listAddedToBoardRule(existingList.id, board.getBoardId());
                        await this.updateWorkspace();
                }
            }
        }

        //
    }
    

    // Method to compare the Id, name, and JSON of the latest Trello board with existing data in opfwsp
    boardDataChanged(existingBoard, latestBoardData) {
        const jsonChanged = JSON.stringify(existingBoard, null, 2) !== latestBoardData.getBoardJson();
        if (jsonChanged) {
            // console.log(`Board Name change - ${existingBoard.name} from ${latestBoardData.getBoardName()}`);
            //console.log("JSON : ", JSON.stringify(existingBoard, null, 2) , "  ", latestBoardData.getBoardJson());
        }

        return jsonChanged;
    }

    // Method to compare the Id, name, and JSON of the latest Trello list with existing data in opfwsp
    listDataChanged(existingList, latestListData) {
        const jsonChanged = JSON.stringify(existingList, null, 2) !== latestListData.getListJson();
        if (jsonChanged) {
            // console.log(`List Name change - ${existingList.name} from ${latestListData.getListName()}`);
            //console.log("JSON : ", JSON.stringify(existingList, null, 2) , "  ", latestListData.getListJson());
        }

        return jsonChanged;
    }

    // Method to compare the Id, name, and JSON of the latest Trello card with existing data in opfwsp
    cardDataChanged(existingCard, latestCardData) {
        const jsonChanged = JSON.stringify(existingCard, null, 2) !== latestCardData.getCardJson();
        if (jsonChanged) {
            // console.log(`Card Name Change -  ${existingCard.name} from ${latestCardData.getCardName()}`);
            //console.log("JSON : ", JSON.stringify(existingCard, null, 2) , "  ", latestCardData.getCardJson());
        }

        // add additional modifications for card updates

        return jsonChanged;
    }

    async updateDuplicates(card, boardId) {
        try {
            console.log('Starting update duplicates with card:', card.id);
    
            // Check if the card object and its labels property are defined
            if (card && card.labels && Array.isArray(card.labels)) {
                //console.log('Card object and labels are valid.');
    
                // If the card has an OPFTech label
                if (card.labels.some(label => label.name.startsWith('#OPFTech-'))) {
                    //console.log('Card has an OPFTech label.');
    
                    // Get the OPFTech number from the card label
                    const opftechnumber = await this.rqtInv.getOPFTechNumber(card.id);
                    //console.log('OPFTech number:', opftechnumber);
    
                    // If there is an OPFTech number, proceed to find duplicates
                    if (opftechnumber) {
                        //console.log('OPFTech number exists. Proceeding to find duplicates.');
                        //console.log('board ID : ', boardId);
    
                        // Get all boards
                        const boards = this.opfvwsp.getBoards();
    
                        // Iterate through boards
                        for (const board of boards) {
                            if (board.getBoardId() !== boardId) {
                                //console.log('Checking board:', board);
    
                                // Get all cards in the current board
                                const cards = board.getCards();
                                //console.log('All cards in the current board:', cards);
    
                                // Find cards with the same OPFTech number in the current board
                                for (const boardCard of cards) {
                                    const cardOpfTechNumber = boardCard.opfTechNumber;
                                    //console.log(`Card ID: ${boardCard.cardId}, name: ${boardCard.cardName},  OPFTech Number: ${cardOpfTechNumber}`);
    
                                    // Ensure boardCard has an 'id' property
                                    if (!boardCard.cardId) {
                                        console.warn('Card does not have a cardId:', boardCard);
                                        continue;
                                    }
    
                                    // Convert both values to integers before checking
                                    const cardOpfTechNumberInt = parseInt(cardOpfTechNumber, 10);
                                    const opftechnumberInt = parseInt(opftechnumber, 10);
    
                                    // Check if the card has the same OPFTech number and a different id
                                    if (!isNaN(cardOpfTechNumberInt) &&
                                        !isNaN(opftechnumberInt) &&
                                        cardOpfTechNumberInt === opftechnumberInt &&
                                        card.cardId !== boardCard.cardId) {

                                        // Retrieved cards
                                        const mainCard = await this.rqtInv.getCard(card.id);
                                        const duplicateCard = await this.rqtInv.getCard(boardCard.cardId);

                                        // Print info for debug
                                        //console.log('Board Card (duplicate) JSON:', JSON.stringify(duplicateCard, null, 2));
                                        //console.log('Main Card JSON:', JSON.stringify(mainCard, null, 2));

                                        // Check if custom fields are present in the retrieved cards
                                        //console.log('Board Card Custom Fields:', duplicateCard.customFieldItems);
                                        //console.log('Main Card Custom Fields:', mainCard.customFieldItems);

                                        // Update Dup card
                                        await this.rqtInv.setCardUpdate(duplicateCard.id, mainCard);

                                        // Iterate over each customFieldItem in duplicateCard.customFieldItems array.
                                        await Promise.all(duplicateCard.customFieldItems.map(async (duplicateCardCustomFieldItem) => {
                                            // console.log('Processing customFieldItem:', duplicateCardCustomFieldItem)

                                            // Combine checks to ensure key exists and mappingCustIds is defined
                                            if (IdsConfigWorkspace.mappingCustIds) {
                                                // Access the custom field ID
                                                const mainCardCustomFieldId = IdsConfigWorkspace.mappingCustIds(boardId, duplicateCardCustomFieldItem.idCustomField);
                                                //console.log('Main ' , mainCardCustomFieldId);
                                                const dupCardCustomFieldValueId = '';

                                                for (const mainCardCustomFieldItem of mainCard.customFieldItems) {
                                                    if (mainCardCustomFieldItem.idCustomField === mainCardCustomFieldId) {
                                                        //console.log('Debug : ', board.getBoardId(), "   , idValue : ", mainCardCustomFieldItem.idValue);
                                                        //console.log('Dup ' , dupCardCustomFieldValueId);
                                                        dupCardCustomFieldValueId = IdsConfigWorkspace.mappingCustOptionsIds(board.getBoardId(), mainCardCustomFieldItem.idValue);

                                                        console.log("Set custom field : ", duplicateCardCustomFieldItem.idCustomField, " on options : ", dupCardCustomFieldValueId, " for card : ", duplicateCard.id);
                                                        // Assuming customFieldOptionsId is defined elsewhere in your code
                                                        await this.rqtInv.setCustomField(duplicateCard.id, duplicateCardCustomFieldItem.idCustomField, dupCardCustomFieldValueId);
                                                    }
                                                }
                                            }
                                        }));

                                        console.log('Duplicate card updated.');
                                    }

                                }
                            }
                        }
                    } else {
                        console.warn('Card does not have a valid OPFTech label. No duplicates to update.');
                    }
                } else {
                    console.warn('Card does not have an OPFTech label. No duplicates to update.');
                }
            } else {
                console.warn('Invalid card object or missing labels property.');
            }
        } catch (error) {
            console.error('Error updating duplicates:', error);
            throw error;
        }
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
                            const listObj = new VList(list.id, list.name, JSON.stringify(list, null, 2) || 'Unknown List');
                            const existingListCards = await this.rqtInv.getListCards(listObj.getListId());
    
                            for (const card of existingListCards) {
                                try {
                                    
                                    // Check if the card has a label with the format "#OPFTech-XXX" && Extract it, set to 0 if do not have one
                                    const opfTechNumberLabel = card.labels.find(label => /^#OPFTech-\d+$/.test(label.name));
                                    const opfTechNumber = opfTechNumberLabel ? parseInt(opfTechNumberLabel.name.match(/\d+/)[0], 10) : 0;

                                    // Create a Card object for each Trello card
                                    const cardObj = new VCard(card.id, card.name, JSON.stringify(card, null, 2), listObj.getListId(), listObj.getListName(), opfTechNumber);
                                    
                                    // STATUS
                                    const statusFieldIds = [IdsConfigWorkspace.opfBoardCustStatusId, IdsConfigWorkspace.sidBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusId];
                                    const statusField = card.customFieldItems && card.customFieldItems.find(field => statusFieldIds.includes(field.idCustomField));
                                    cardObj.setStatusT(statusField ? statusField.value.text || '' : '');

                                    // PRIORITY
                                    const priorityFieldIds = [IdsConfigWorkspace.opfBoardCustPriorityId, IdsConfigWorkspace.sidBoardCustPriorityId, IdsConfigWorkspace.techBoardCustPriorityId];
                                    const priorityField = card.customFieldItems && card.customFieldItems.find(field => priorityFieldIds.includes(field.idCustomField));
                                    cardObj.setPriorityT(priorityField ? priorityField.value.text || '' : '');

                                    // ISSUER
                                    const issuerFieldIds = [IdsConfigWorkspace.opfBoardCustIssuerId, IdsConfigWorkspace.sidBoardCustIssuerId, IdsConfigWorkspace.techBoardCustIssuerId];
                                    const issuerField = card.customFieldItems && card.customFieldItems.find(field => issuerFieldIds.includes(field.idCustomField));
                                    cardObj.setIssuerT(issuerField ? issuerField.value.text || '' : '');

                                    // TECH
                                    const techFieldIds = [IdsConfigWorkspace.opfBoardCustTechId, IdsConfigWorkspace.sidBoardCustTechId, IdsConfigWorkspace.techBoardCustTechId];
                                    const techField = card.customFieldItems && card.customFieldItems.find(field => techFieldIds.includes(field.idCustomField));
                                    cardObj.setTechT(techField ? techField.value.text || '' : '');

                                    // Add the card object to the list object
                                    listObj.addCard(cardObj);
                                    //console.log("Card added to list, ", cardObj.getCardId(), ", ", cardObj.getCardName());
                                } catch (cardError) {
                                    console.error('Error processing card:', cardError.response ? cardError.response.data : cardError.message);
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
                    const boardObj = new VBoard(existingBoardData.id, existingBoardData.name, JSON.stringify(existingBoardData, null, 2), listObjects);
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
