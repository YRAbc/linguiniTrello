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

        try {

          if (boardId === IdsConfigWorkspace.techBoardId ||
            listId === IdsConfigWorkspace.opfBoardDoingListId ||
            listId === IdsConfigWorkspace.opfBoardSentToSIDListId ||
            listId === IdsConfigWorkspace.sidBoardTechListId)
            {
              await this.rqtInv.deleteCard(cardId);
            }

          /*CARD ADDED TO OPF TO DO LIST TECH */
          else{ if (listId === IdsConfigWorkspace.opfBoardTechListId) {

                // Assuming you have a method in your getter class to get the card details
                const cardDetails = await this.rqtInv.getCard(cardId);

                // Get the maximum OPFTech number AND Set label +1
                const maxOPFTechNumber = await this.rqtInv.getOPFTechMaxNumber(boardId); //Which is OPF To Do List Board
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
          }

        } catch (error) {
            console.error('Error in cardAddedToListRule:', error);
            throw error;
        }
    }
    
    async cardModifiedInListRule(cardId, listId, boardId) {

    }

    async cardMovedToListRule(cardId, startListId, endListId, boardId) {
 
        try {
            // TECH CUSTOM FIELD UPDATE WITH CARD MOVE
            const cardDetails = await this.rqtInv.getCard(cardId);
      
            if (endListId === IdsConfigWorkspace.techBoardProjectListId) {
              await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustTechId, IdsConfigWorkspace.techBoardCustTechProjectId);
            }
      
            if (endListId === IdsConfigWorkspace.techBoardSupportListId) {
              await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustTechId, IdsConfigWorkspace.techBoardCustTechSupportId);
            }
      
            if (endListId === IdsConfigWorkspace.techBoardSidListId) {
              await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustTechId, IdsConfigWorkspace.techBoardCustTechSidId);
            }
      
            // STATUS CUSTOM FIELD UPDATE WITH CARD MOVE
            if (endListId === IdsConfigWorkspace.techBoardSentToSidListId) {
              await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusSentToSidId);
              const cardDetails = await this.rqtInv.getCard(cardId);
              await this.rqtInv.copyCardToList(cardId, IdsConfigWorkspace.sidBoardTechListId, cardDetails);
            }

            if (endListId === IdsConfigWorkspace.techBoardInProgressListId) {
              await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusInProgressId);
            }
      
            if (endListId === IdsConfigWorkspace.techBoardTestingListId) {
              await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusTestingId);
            }
      
            if (endListId === IdsConfigWorkspace.techBoardPendingDeliveryListId) {
              await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusPendingDeliveryId);
            }
      
            if (endListId === IdsConfigWorkspace.techBoardDeliveredListId) {
              await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusDeliveredId);
            }
      
            if (endListId === IdsConfigWorkspace.techBoardVaidatedListId) {
              await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.techBoardCustStatusId, IdsConfigWorkspace.techBoardCustStatusValidatedId);
            }
      
            if (endListId === IdsConfigWorkspace.opfBoardValidatedListId) {
              await this.rqtInv.setCustomField(cardId, IdsConfigWorkspace.opfBoardCustStatusId, IdsConfigWorkspace.opfBoardCustStatusValidatedId);
            }
      
            // CARD IS MOVED FROM SID OPF TECH LIST
            if (startListId === IdsConfigWorkspace.sidBoardTechListId) {
              await this.rqtInv.moveCardToList(cardId, startListId);
            }
      
                console.log('Card move and updates completed successfully.');
            } catch (error) {
                console.error('Error in cardMovedToListRule:', error);
            }
    }

    async cardRemovedFromListRule(cardId, listId, boardId) {

    }

}

export default TrelloServerWorkspace;
