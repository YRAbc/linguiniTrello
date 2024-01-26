// ruler.js
// Made by Yoann Raton, 24/01/2024

import Workspace from './workspace.js';
import Post from './post.js';
import Get from './get.js';

class Ruler {
    constructor(workspace, getter, poster) {
        this.workspace = workspace;
        this.getter = getter;
        this.poster = poster;
    }

    boardModifiedRule(boardID) {

        //Logic for board modified
    }

    listAddedToBoardRule(listID, boardID) {

        //Logic for list add
    }

    listModifiedInBoardRule(listID, boardID) {

        //Logic for list modified
    }

    listRemovedFromBoardRule(listID, boardID) {

        //Logic for list remove
    }

    async cardAddedToListRule(cardID, listID, boardID) {
        try {
            // Assuming you have a method in your getter class to get the card details
            const cardDetails = await this.getter.getCard(cardID);

            // Assuming the list ID for OPF Tech cards is '65a5339acc54164519f05621'
            const opfTechListID = '65a5339acc54164519f05621';

            // Check if the card is added to the OPF Tech list
            if (listID === opfTechListID) {

                // Get the maximum OPFTech number
                const maxOPFTechNumber = await this.findMaxOPFTechNumber();

                // Set label to maxOPFTechNumber + 1
                const nextOPFTechNumber = Number(maxOPFTechNumber) + 1;
                await this.poster.addOPFTechNumber(cardID, nextOPFTechNumber);

                //Status custom field
                try {
                    // Retrieve information about the 'Status' custom field for the specified card
                    const statusCustomField = await this.getter.getCustomField(cardID, 'Status');
                  
                    if (statusCustomField) {
                      // Set the value of the 'Status' custom field to "Open"
                      await this.poster.setCustomField(statusCustomField.id, 'Open');
                    } else {
                      console.error('Custom field "Status" not found for the specified card.');
                    }
                  } catch (error) {
                    console.error('Error setting custom field:', error.message);
                }


                // Get the updated value of 'Status' using the getCustomField method
                const updatedStatusField = await this.getter.getCustomField(cardID, 'Status');

                console.log('OPF Tech Card initialized successfully.');

                // You can now use updatedStatusField as needed.
                console.log('Updated Status:', updatedStatusField);
            }
        } catch (error) {
            console.error('Error in cardAddedToListRule:', error);
            throw error;
        }
    }

    async cardModifiedInListRule(cardID, listID, boardID) {

        //Logic for card modified
        /* ENTRANCE IN OPF TECH LIST ON TO DO LIST BOARD 
        try {
            // Get the card details
            const cardDetails = await this.getter.getCard(cardID);

            // Check if the card has the desired label (e.g., #OPFTech-XXX)
            if (this.hasOPFTechLabel(cardDetails.labels)) {
                // Iterate through all boards in the workspace
                for (const board of this.workspace.getBoards()) {
                    // Skip the current board
                    if (board.getBoardID() === boardID) {
                        continue;
                    }

                    // Find cards in other boards with the same label
                    const matchingCards = await this.getter.findCardsByLabel(board.getBoardID(), cardDetails.labels);

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

    async cardMovedToListRule(cardID, listID, boardID) {
        
        //Logic for card move
        /*try {
            // Assuming you have a method in your getter class to get the card details
            const cardDetails = await this.getter.getCard(cardID);

            // Assuming the list ID for OPF Tech cards is '65a5339acc54164519f05621'
            const opfTechListID = '65a5339acc54164519f05621';

            // Check if the card is moved to the OPF Tech list and does not have an OPFTech ID
            if (listID === opfTechListID && !this.hasOPFTechLabel(cardDetails.labels)) {
                // Apply the same logic as cardAddedToListRule
                await this.cardAddedToListRule(cardID, listID, boardID);
                console.log('OPF Tech Card initialized successfully after being moved to the OPF Tech list.');
            }
        } catch (error) {
            console.error('Error in cardMovedToListRule:', error);
            throw error;
        }*/
    }

    cardRemovedFromListRule(cardID, listID, boardID) {

        //Logic for card remove
    }


    /* HAS LABEL AND UPDATE */
    
    hasOPFTechLabel(labels) {
        // Check if the labels array contains the desired label (e.g., #OPFTech-XXX)
        return labels.some(label => label.name.startsWith('#OPFTech-'));
    }

    async findMaxOPFTechNumber() {
        try {
            let maxOPFTechNumber = 0;
    
            // Iterate through all boards in the workspace
            for (const board of this.workspace.getBoards()) {
                // Get all cards in the board
                const cards = await this.getter.getBoardCards(board.getBoardID());
    
                // Iterate through each card to find the max OPFTech number
                for (const card of cards) {
                    const opfTechNumberString = await this.getter.getOPFTechNumber(card.id);
                    
                    // Convert the fetched value to a number
                    const opfTechNumber = parseFloat(opfTechNumberString);
    
                    if (!isNaN(opfTechNumber) && opfTechNumber > maxOPFTechNumber) {
                        maxOPFTechNumber = opfTechNumber;
                    }
                }
            }
    
            // Return the maximum OPFTech number
            return maxOPFTechNumber;
        } catch (error) {
            console.error('Error in findMaxOPFTechNumber:', error);
            throw error;
        }
    }    

    async updateMatchingCard(matchingCard, sourceCardDetails) {
        try {
            // Assuming you want to update specific properties of the matching card
            // You can modify this logic based on your requirements
            await this.poster.setCardDescription(matchingCard.id, sourceCardDetails.desc);
            await this.poster.setCardPriority(matchingCard.id, sourceCardDetails.priority);
            // Add more update logic as needed
        } catch (error) {
            console.error('Error updating matching card:', error);
            throw error;
        }
    }



}

export default Ruler;
