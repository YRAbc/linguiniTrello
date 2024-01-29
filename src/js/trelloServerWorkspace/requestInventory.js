// requestInventory.js
// Made by Yoann Raton, 25/01/2024

import axios from 'axios';
import oAuth from './authSettings.js';

class RequestInventory {
  
  constructor() {
    this.oauth = new oAuth();
  }

  async getBoard(boardId) {
    try {
      const response = await axios.get(`https://api.trello.com/1/boards/${boardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
      
      //console.log('Full response:', response); // Log the entire response
      
      if (response.data && typeof response.data === 'object') {
        const board = response.data;
        //console.log('Board information:', board);
        return board;
      } else {
        console.error('Invalid board response:', response.data);
        throw new Error('Invalid board response');
      }
    } catch (error) {
      console.error('Error getting board:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getList(listId) {
    try {
      const response = await axios.get(`https://api.trello.com/1/lists/${listId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
      
      //console.log('Full response:', response); // Log the entire response
      
      if (response.data && typeof response.data === 'object') {
        const list = response.data;
        //console.log('List information:', list);
        return list;
      } else {
        console.error('Invalid list response:', response.data);
        throw new Error('Invalid list response');
      }
    } catch (error) {
      console.error('Error getting list:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getCard(cardId) {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
      
      //console.log('Full response:', response); // Log the entire response
      
      if (response.data && typeof response.data === 'object') {
        const card = response.data;
        //console.log('Card information:', card);
        return card;
      } else {
        console.error('Invalid card response:', response.data);
        throw new Error('Invalid card response');
      }
    } catch (error) {
      console.error('Error getting card:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  //Sub elements
  async getBoardLists(boardId) {
    try {
        const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
      
        //console.log('Full response:', response); // Log the entire response
      
        if (response.data && Array.isArray(response.data)) {
            const lists = response.data;
            //console.log('Lists:', lists);
            return lists;
        } else {
            console.error('Invalid board response:', response.data);
            throw new Error('Invalid board response');
        }
    } catch (error) {
        console.error('Error getting board lists:', error.response ? error.response.data : error.message);
        throw error;
    }
  }

  async getBoardCards(boardId) {
    try {
        const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
      
        //console.log('Full response:', response); // Log the entire response
      
        if (response.data && Array.isArray(response.data)) {
            const cards = response.data;
            //console.log('Cards:', cards);
            return cards;
        } else {
            console.error('Invalid board response:', response.data);
            throw new Error('Invalid board response');
        }
    } catch (error) {
        console.error('Error getting board cards:', error.response ? error.response.data : error.message);
        throw error;
    }
  }

  async getListCards(listId) {
    try {
        const response = await axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
      
        //console.log('Full response:', response); // Log the entire response
      
        if (response.data && Array.isArray(response.data)) {
            const cards = response.data;
            //console.log('Cards:', cards);
            return cards;
        } else {
            console.error('Invalid list response:', response.data);
            throw new Error('Invalid list response');
        }
    } catch (error) {
        console.error('Error getting list cards:', error.response ? error.response.data : error.message);
        throw error;
    }
  }


  //Upper element
  async getListFromCard(cardId) {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);

      // console.log('Full response:', response); // Log the entire response

      if (response.data && typeof response.data === 'object') {
          const card = response.data;
          const listId = card.idList;

          // Retrieve the list information using the listId
          const listResponse = await axios.get(`https://api.trello.com/1/lists/${listId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
          
          // console.log('List information:', listResponse.data);
          
          if (listResponse.data && typeof listResponse.data === 'object') {
              const list = listResponse.data;
              return list;
          } else {
              console.error('Invalid list response:', listResponse.data);
              throw new Error('Invalid list response');
          }
      } else {
          console.error('Invalid card response:', response.data);
          throw new Error('Invalid card response');
      }
    } catch (error) {
      console.error('Error getting list for card:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getBoardFromList(listId) {
    try {
      const listResponse = await axios.get(`https://api.trello.com/1/lists/${listId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);

      if (listResponse.data && typeof listResponse.data === 'object') {
        const list = listResponse.data;
        const boardId = list.idBoard;

        const boardResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);

        if (boardResponse.data && typeof boardResponse.data === 'object') {
          const board = boardResponse.data;
          return board;
        } else {
          console.error('Invalid board response:', boardResponse.data);
          throw new Error('Invalid board response');
        }
      } else {
        console.error('Invalid list response:', listResponse.data);
        throw new Error('Invalid list response');
      }
    } catch (error) {
      console.error('Error getting board for list:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getBoardFromCard(cardId) {
    try {
      const cardResponse = await axios.get(`https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);

      if (cardResponse.data && typeof cardResponse.data === 'object') {
        const card = cardResponse.data;
        const boardId = card.idBoard;

        const boardResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);

        if (boardResponse.data && typeof boardResponse.data === 'object') {
          const board = boardResponse.data;
          return board;
        } else {
          console.error('Invalid board response:', boardResponse.data);
          throw new Error('Invalid board response');
        }
      } else {
        console.error('Invalid card response:', cardResponse.data);
        throw new Error('Invalid card response');
      }
    } catch (error) {
      console.error('Error getting board for card:', error.response ? error.response.data : error.message);
      throw error;
    }
  }


  // Card getters
  async getOPFTechNumber(cardId) {
    try {
        // Get the card details
        const cardDetails = await this.getCard(cardId);

        // Check if the OPFTech label exists on the card
        const opfTechLabel = cardDetails.labels.find(label => label.name.startsWith('#OPFTech-'));

        if (opfTechLabel) {
            // Extract the number from the label
            const number = opfTechLabel.name.replace('#OPFTech-', '');
            return number;
        } else {
            // Return null or another indicator if the OPFTech label is not found
            return null;
        }
    } catch (error) {
        console.error('Error in getOPFTechNumber:', error);
        throw error;
    }
  }

  async getCustomField(cardId, fieldName) {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}/customFields?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);

      const customFields = response.data;
      const matchingField = customFields.find(field => field.name === fieldName);

      return matchingField;
    } catch (error) {
      console.error('Error getting custom fields:', error.response ? error.response.data : error.message);
      throw error;
    }
  }


  // POST
  async addOPFTechNumber(cardId, opfTechNumber) {
    let frontText;
    try {
      frontText = `#OPFTech-${opfTechNumber}`;
      
      const cardDetailsResponse = await axios.get(
        `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`
      );

      const cardDetails = cardDetailsResponse.data;

      const existingLabel = cardDetails.labels.find(label => label.name === frontText);

      if (!existingLabel) {
        const labelCreationResponse = await axios.post(
          `https://api.trello.com/1/cards/${cardId}/labels?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
          { name: frontText, color: "null", pos: "top", display_cardFront: "true" }
        );

        console.log(`Label ${frontText} added successfully. Response:`, labelCreationResponse.data);
      } else {
        console.log(`Label ${frontText} already exists on the card.`);
      }
    } catch (error) {
      console.error(`Error adding label ${frontText}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async setCustomField(cardId, customFieldId, valueId) {
    try {
        await axios.put(
            `https://api.trello.com/1/cards/${cardId}/customField/${customFieldId}/item?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
            {
                idValue: valueId,
            }
        );

        console.log('Custom field updated successfully.');
    } catch (error) {
        console.error('Error updating custom field:', error.response ? error.response.data : error.message);
        throw error;
    }
  }

  async setCardDescription(cardId, cardDescription) {
    try {
      await axios.put(
        `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&desc=${encodeURIComponent(cardDescription)}`
      );

      console.log('Card description updated successfully.');
    } catch (error) {
      console.error('Error updating card description:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async createCard(boardId, listId, cardName, cardDescription) {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&idBoard=${boardId}&idList=${listId}&name=${encodeURIComponent(cardName)}&desc=${encodeURIComponent(cardDescription)}`
      );

      const createdCard = response.data;
      console.log('Card created successfully:', createdCard);
      return createdCard;
    } catch (error) {
      console.error('Error creating card:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async moveCardToList(cardId, listId) {
    try {
      const response = await axios.put(`https://api.trello.com/1/cards/${cardId}/idList?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`, { value: listId });

      if (response.data && typeof response.data === 'object') {
        const movedCard = response.data;
        return movedCard;
      } else {
        console.error('Invalid card move response:', response.data);
        throw new Error('Invalid card move response');
      }
    } catch (error) {
      console.error('Error moving card to list:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async copyCardToList(cardId, listId, copyData) {
    try {
      const response = await axios.post(`https://api.trello.com/1/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`, {
        ...copyData,
        idList: listId,
        idCardSource: cardId
      });

      if (response.data && typeof response.data === 'object') {
        const copiedCard = response.data;
        return copiedCard;
      } else {
        console.error('Invalid card copy response:', response.data);
        throw new Error('Invalid card copy response');
      }
    } catch (error) {
      console.error('Error copying card to list:', error.response ? error.response.data : error.message);
      throw error;
    }
  }


}

export default RequestInventory;
