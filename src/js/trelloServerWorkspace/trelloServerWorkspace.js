// trelloServerWorkspace.js
// Made by Yoann Raton, 24/01/2024

import RequestInventory from './requestInventory.js';
import IdsConfigWorkspace from '../idsWorkspace/idsConfigWorkspace.js';
import VWorkspace from '../virtualWorkspace/vworkspace.js';

class TrelloServerWorkspace {

    constructor(name, config, opfvwsp) {
        this.name = name;
        this.config = config;
        this.opfvwsp = opfvwsp;
        this.rqtInv = new RequestInventory();
    }

    async boardModifiedRule(boardId) {

    }

    async listAddedToBoardRule(listId, boardId) {

    }

    async listModifiedInBoardRule(listId, boardId) {

    }

    async listRemovedFromBoardRule(listId, boardId) {

    }

    async cardAddedToListRule(cardId, listId, boardId) {

        /*CARD ADDED TO OPF TO DO LIST TECH */
        try {
            // Assuming you have a method in your getter class to get the card details
            const cardDetails = await this.rqtInv.getCard(cardId);

            // Check if the card is added to the OPF Tech list
            if (listId === IdsConfigWorkspace.opfBoardTechListId) {

                // Get the maximum OPFTech number AND Set label +1
                const maxOPFTechNumber = await this.rqtInv.getOPFTechMaxNumber(IdsConfigWorkspace.opfBoardId);
                const nextOPFTechNumber = Number(maxOPFTechNumber) + 1;
                await this.rqtInv.addOPFTechNumber(cardId, nextOPFTechNumber);

                // Set Custom Fields
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.opfBoardCustPriorityId, IdsConfigWorkspace.opfBoardCustPriorityToQualifyId);
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.opfBoardCustIssuerId, IdsConfigWorkspace.opfBoardCustIssuerToQualifyId);
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.opfBoardCustTechId, IdsConfigWorkspace.opfBoardCustTechToQualifyId);
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.opfBoardCustStatusId, IdsConfigWorkspace.opfBoardCustStatusOpenId);
                
                await this.rqtInv.copyCardToList(cardId, IdsConfigWorkspace.techBoardToClassifyListId, cardDetails);

                console.log('OPF Tech Card initialized successfully.');
            }

        } catch (error) {
            console.error('Error in cardAddedToListRule:', error);
            throw error;
        }


        /*DELETE CARD ADDED TO OPF TECH TASK BOARD IN EVERY OTHER LISTS*/
        try {
            // Assuming you have a method in your getter class to get the card details
            const cardDetails = await this.rqtInv.getCard(cardId);

            // Check if the card is added to the OPF Tech list
            if (listId === IdsConfigWorkspace.techBoardProjectListId || 
                listId === IdsConfigWorkspace.techBoardSupportListId ||
                listId === IdsConfigWorkspace.techBoardSidListId ||
                listId === IdsConfigWorkspace.techBoardInProgreeListId ||
                listId === IdsConfigWorkspace.techBoardInReviewListId ||
                listId === IdsConfigWorkspace.techBoardPendingDeliveryListId ||
                listId === IdsConfigWorkspace.techBoardDoneListId ||
                listId === IdsConfigWorkspace.techBoardVaidatedListId ) {

                //Can't add cards to OPF Tech Task board
                await this.rqtInv.deleteCard(cardId);
            }

        } catch (error) {
            console.error('Error in cardAddedToListRule:', error);
            throw error;
        }


    }

    async cardModifiedInListRule(cardId, listId, boardId) {


    }

    async cardMovedToListRule(cardId, startListId, endListId, boardId) {

        /* TECH CUSTOM FIELD UPDATE WITH CARD MOVE*/
        try {
            // Assuming you have a method in your getter class to get the card details
            const cardDetails = await this.rqtInv.getCard(cardId);

            // Card is a tech project
            if (endListId === IdsConfigWorkspace.techBoardProjectListId) {
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustTechId, IdsConfigWorkspace.techBoardCustTechProjectId);
            }
            
            // Card is a tech support
            if (endListId === IdsConfigWorkspace.techBoardSupportListId) {
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustTechId, IdsConfigWorkspace.techBoardCustTechSupportId);
            }
            
            // Card is a SID task
            if (endListId === IdsConfigWorkspace.techBoardSidListId) {
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustTechId, IdsConfigWorkspace.techBoardCustTechSidId);
                const cardDetails = await this.rqtInv.getCard(cardId);
                await this.rqtInv.copyCardToList(cardId, IdsConfigWorkspace.sidBoardTechListId, cardDetails);
            }

        } catch (error) {
            console.error('Error in move for Tech:', error);
            throw error;
        }

        /* STATUS CUSTOM FIELD UPDATE WITH CARD MOVE*/
        try {

            // Card is move to InProgress OPF TECH SIDE
            if (endListId === IdsConfigWorkspace.techBoardInProgressListId) {
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusInProgressId);
            }

            // Card is move to Testing OPF TECH SIDE
            if (endListId === IdsConfigWorkspace.techBoardTestingListId) {
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusTestingId);
            }

             // Card is move to Pending Delivery OPF TECH SIDE
            if (endListId === IdsConfigWorkspace.techBoardPendingDeliveryListId ) {
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusPendingDeliveryId);
            }

            // Card is move to Delivered OPF TECH SIDE
            if (endListId === IdsConfigWorkspace.techBoardDeliveredListId) {
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusDeliveredId);
            }

            // Card is move to Validated OPF TECH SIDE
            if (endListId === IdsConfigWorkspace.techBoardVaidatedListId) {
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusValidatedId);
            }

            // Card is move to Validated OPF SIDE
            if (endListId === IdsConfigWorkspace.opfBoardValidatedListId) {
                await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.opfBoardCustStatusId, IdsConfigWorkspace.opfBoardCustStatusValidatedId);
            }


        } catch (error) {
            console.error('Error in move for Status:', error);
            throw error;
        }

        /* CARD IS MOVED FROM SID OPF TECH LIST */
        try {

            // Card is move to InProgress OPF TECH SIDE
            if (startListId === IdsConfigWorkspace.sidBoardTechListId) {
                await this.rqtInv.moveCardToList(cardId, startListId);
            }

        } catch (error) {
            console.error('Error in move for Tech:', error);
            throw error;
        }

    }

    async cardRemovedFromListRule(cardId, listId, boardId) {

    }

}

export default TrelloServerWorkspace;
