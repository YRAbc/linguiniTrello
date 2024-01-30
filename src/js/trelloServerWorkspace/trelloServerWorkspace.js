// trelloServerWorkspace.js
// Made by Yoann Raton, 24/01/2024

import RequestInventory from './requestInventory.js';
import IdsConfigWorkspace from '../idsWorkspace/idsConfigWorkspace.js';
import VWorkspace from '../virtualWorkspace/vworkspace.js';

class TrelloServerWorkspace {

    constructor(name, config, opfvwsp) {
        this.name = "name";
        this.config = config;
        this.opfvwsp = opfvwsp;
        this.rqtInv = new RequestInventory();
    }

    boardModifiedRule(boardId) {

        //Logic for board modified
    }

    listAddedToBoardRule(listId, boardId) {

        //Logic for list add
    }

    listModifiedInBoardRule(listId, boardId) {

        //Logic for list modified
    }

    listRemovedFromBoardRule(listId, boardId) {

        //Logic for list remove
    }

    async cardAddedToListRule(cardId, listId, boardId) {
        try {
            // Assuming you have a method in your getter class to get the card details
            const cardDetails = await this.rqtInv.getCard(cardId);

            // Check if the card is added to the OPF Tech list
            if (listId === this.config.opfBoardTechListId) {

                // Get the maximum OPFTech number
                const maxOPFTechNumber = await this.findMaxOPFTechNumber();

                // Set label to maxOPFTechNumber + 1
                const nextOPFTechNumber = Number(maxOPFTechNumber) + 1;
                await this.rqtInv.addOPFTechNumber(cardId, nextOPFTechNumber);

                /*
                // Set Custom Fields
                await this.rqtInv.setCustomField(cardId, "65b3cb5da8d2096df151f434", "65b3eb34c91e150132d34f69");*/

                console.log('OPF Tech Card initialized successfully.');

            }

        } catch (error) {
            console.error('Error in cardAddedToListRule:', error);
            throw error;
        }
    }

    async cardModifiedInListRule(cardId, listId, boardId) {

        //Logic for card modified
        /* ENTRANCE IN OPF TECH LIST ON TO DO LIST BOARD 
        try {
            // Get the card details
            const cardDetails = await this.getter.getCard(cardId);

            // Check if the card has the desired label (e.g., #OPFTech-XXX)
            if (this.hasOPFTechLabel(cardDetails.labels)) {
                // Iterate through all boards in the workspace
                for (const board of this.workspace.getBoards()) {
                    // Skip the current board
                    if (board.getBoardId() === boardId) {
                        continue;
                    }

                    // Find cards in other boards with the same label
                    const matchingCards = await this.getter.findCardsByLabel(board.getBoardId(), cardDetails.labels);

                    // Update matching cards with the same label
                    for (const matchingCard of matchingCards) {
                        await this.updateMatchingCard(matchingCard, cardDetails);
                    }
                }
            }
        } catch (error) {
            console.error('Error in cardModifiedInListRule:', error);
            throw error;
        }*/


        /* CHECK FOR LISTS IF ON BOARD OPF TECH TASK BOARD */
    }

    async cardMovedToListRule(cardId, listId, boardId) {
        
        //Logic for card move
        /*try {
            // Assuming you have a method in your getter class to get the card details
            const cardDetails = await this.getter.getCard(cardId);

            // Assuming the list Id for OPF Tech cards is '65a5339acc54164519f05621'
            const opfTechListId = '65a5339acc54164519f05621';

            // Check if the card is moved to the OPF Tech list and does not have an OPFTech Id
            if (listId === opfTechListId && !this.hasOPFTechLabel(cardDetails.labels)) {
                // Apply the same logic as cardAddedToListRule
                await this.cardAddedToListRule(cardId, listId, boardId);
                console.log('OPF Tech Card initialized successfully after being moved to the OPF Tech list.');
            }
        } catch (error) {
            console.error('Error in cardMovedToListRule:', error);
            throw error;
        }*/
    }

    cardRemovedFromListRule(cardId, listId, boardId) {

        //Logic for card remove
    }


    /* HAS LABEL AND UPDATE */
    
    hasOPFTechLabel(labels) {
        // Check if the labels array contains the desired label (e.g., #OPFTech-XXX)
        return labels.some(label => label.name.startsWith('#OPFTech-'));
    }

    async addOPFTechNumber(cardId, opfTechNumber, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
        let frontText;
        try {
            frontText = `#OPFTech-${opfTechNumber}`;
    
            // Get the card details with retry logic and custom timeout
            const cardDetailsResponse = await this.getCard(cardId, retryCount, delay, timeout);
            console.log("card : ", cardDetailsResponse.name);
            console.log("card : ", cardDetailsResponse.id);
            console.log("card : ", cardDetailsResponse.labels);
    
            // Check if 'labels' property exists and is an array
            if (cardDetailsResponse.data) {
                if (!Array.isArray(cardDetailsResponse.data.labels)) {
                    // If 'labels' is not an array or is undefined, create an empty array
                    cardDetailsResponse.data.labels = [];
                }
    
                const existingLabel = cardDetailsResponse.data.labels.find(label => label.name === frontText);
    
                if (!existingLabel) {
                    const labelCreationResponse = await axios.post(
                        `https://api.trello.com/1/cards/${cardId}/labels?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
                        { name: frontText, color: "null", pos: "top", display_cardFront: "true" }
                    );
    
                    console.log(`Label ${frontText} added successfully. Response:`, labelCreationResponse.data);
                } else {
                    console.log(`Label ${frontText} already exists on the card.`);
                }
            } else {
                console.error(`Error: 'data' property is undefined.`);
            }
        } catch (error) {
            console.error(`Error adding label ${frontText}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    }
    
    async updateMatchingCard(matchingCard, sourceCardDetails) {
        try {
            // Assuming you want to update specific properties of the matching card
            // You can modify this logic based on your requirements
            await this.rqtInv.setCardDescription(matchingCard.id, sourceCardDetails.desc);
            await this.rqtInv.setCardPriority(matchingCard.id, sourceCardDetails.priority);
            // Add more update logic as needed
        } catch (error) {
            console.error('Error updating matching card:', error);
            throw error;
        }
    }



}

export default TrelloServerWorkspace;
