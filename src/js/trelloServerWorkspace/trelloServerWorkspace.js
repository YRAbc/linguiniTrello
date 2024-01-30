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

    boardModifiedRule(boardId) {

    }

    listAddedToBoardRule(listId, boardId) {

    }

    listModifiedInBoardRule(listId, boardId) {

    }

    listRemovedFromBoardRule(listId, boardId) {

    }

    async cardAddedToListRule(cardId, listId, boardId) {
        try {
            // Assuming you have a method in your getter class to get the card details
            const cardDetails = await this.rqtInv.getCard(cardId);

            // Check if the card is added to the OPF Tech list
            if (listId === this.config.opfBoardTechListId) {

                // Get the maximum OPFTech number AND Set label +1
                const maxOPFTechNumber = await this.rqtInv.getOPFTechMaxNumber(boardId);
                const nextOPFTechNumber = Number(maxOPFTechNumber) + 1;
                await this.rqtInv.addOPFTechNumber(cardId, nextOPFTechNumber);

                // Set Custom Fields
                await this.rqtInv.setCustomField(cardId, this.config.opfBoardCustPriorityId(), this.config.opfBoardCustPriorityToQualifyId(), null);
                await this.rqtInv.setCustomField(cardId, this.config.opfBoardCustTechId(), this.config.opfBoardCustTechToQualifyId(), null);
                await this.rqtInv.setCustomField(cardId, this.config.opfBoardCustIssuerId(), this.config.opfBoardCustIssuerToQualifyId(), null);
                await this.rqtInv.setCustomField(cardId, this.config.opfBoardCustStatusId(), this.config.opfBoardCustStatusOpenId(), null);

                console.log('OPF Tech Card initialized successfully.');
            }

        } catch (error) {
            console.error('Error in cardAddedToListRule:', error);
            throw error;
        }
    }

    async cardModifiedInListRule(cardId, listId, boardId) {

    }

    async cardMovedToListRule(cardId, listId, boardId) {
        
    }

    cardRemovedFromListRule(cardId, listId, boardId) {

    }
    
    async updateMatchingCard(matchingCard, sourceCardDetails) {

    }

}

export default TrelloServerWorkspace;
