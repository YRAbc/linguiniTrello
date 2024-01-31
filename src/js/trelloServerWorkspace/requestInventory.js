// requestInventory.js
// Made by Yoann Raton, 25/01/2024

import axios from 'axios';
import oAuth from './authSettings.js';

class RequestInventory {
  constructor() {
    this.oauth = new oAuth();
    this.defaultTimeout = 10000; 

  }

  async getBoard(boardId, retryCount = 3, delay = 1000) {
    try {
      const response = await axios.get(`https://api.trello.com/1/boards/${boardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
      
      if (response.data && typeof response.data === 'object') {
        const board = response.data;
        return board;
      } else {
        console.error('Invalid board response:', response.data);
        throw new Error('Invalid board response');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getBoard(boardId, retryCount - 1, delay * 2); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting board:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async getList(listId, retryCount = 3, delay = 1000) {
    try {
      const response = await axios.get(`https://api.trello.com/1/lists/${listId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
      
      if (response.data && typeof response.data === 'object') {
        const list = response.data;
        return list;
      } else {
        console.error('Invalid list response:', response.data);
        throw new Error('Invalid list response');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getList(listId, retryCount - 1, delay * 2); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting list:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async getCard(cardId, retryCount = 3, delay = 1000) {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
      
      if (response.data && typeof response.data === 'object') {
        const card = response.data;
        return card;
      } else {
        console.error('Invalid card response:', response.data);
        throw new Error('Invalid card response');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getCard(cardId, retryCount - 1, delay * 2); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting card:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async getBoardLists(boardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`, {
        timeout: timeout,
      });

      if (response.data && Array.isArray(response.data)) {
        const lists = response.data;
        return lists;
      } else {
        console.error('Invalid board response:', response.data);
        throw new Error('Invalid board response');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getBoardLists(boardId, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting board lists:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async getBoardCards(boardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`, {
        timeout: timeout,
      });

      if (response.data && Array.isArray(response.data)) {
        const cards = response.data;
        return cards;
      } else {
        console.error('Invalid board response:', response.data);
        throw new Error('Invalid board response');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getBoardCards(boardId, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting board cards:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async getListCards(listId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`, {
        timeout: timeout,
      });

      if (response.data && Array.isArray(response.data)) {
        const cards = response.data;
        return cards;
      } else {
        console.error('Invalid list response:', response.data);
        throw new Error('Invalid list response');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getListCards(listId, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting list cards:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async getListFromCard(cardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`, {
        timeout: timeout,
      });

      if (response.data && typeof response.data === 'object') {
        const card = response.data;
        const listId = card.idList;

        // Retrieve the list information using the listId
        const listResponse = await this.getList(listId, retryCount, delay, timeout);

        return listResponse;
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
  async getOPFTechNumber(cardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      // Get the card details with retry logic and custom timeout
      const cardDetails = await this.getCard(cardId, retryCount, delay, timeout);

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

  async getOPFTechMaxNumber(boardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
          // Get all cards in the specified Trello board
          const cardsResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`);
          const cards = cardsResponse.data;

          let maxOPFTechNumber = 0;

          // Iterate through the cards to find the maximum OPFTechNumber
          for (const card of cards) {
              const labels = card.labels || [];
              labels.forEach(label => {
                  const labelName = label.name || '';
                  const match = labelName.match(/^#OPFTech-(\d+)$/);
                  if (match && match[1]) {
                      const currentOPFTechNumber = parseInt(match[1], 10);
                      if (!isNaN(currentOPFTechNumber) && currentOPFTechNumber > maxOPFTechNumber) {
                          maxOPFTechNumber = currentOPFTechNumber;
                      }
                  }
              });
          }

          console.log('Max OPFTechNumber:', maxOPFTechNumber);
          return maxOPFTechNumber;
      } catch (error) {
          console.error('Error in getOPFTechMaxNumber:', error.response ? error.response.data : error.message);
          throw error;
      }
  }

  async getCustomField(cardId, fieldName, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}/customFields?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`, {
        timeout: timeout,
      });

      const customFields = response.data;
      const matchingField = customFields.find(field => field.name === fieldName);

      return matchingField;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getCustomField(cardId, fieldName, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting custom fields:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }


  // POST
  async addOPFTechNumber(cardId, opfTechNumber, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    let frontText;
    try {
        frontText = `#OPFTech-${opfTechNumber}`;

        // Get the card details with retry logic and custom timeout
        const cardDetailsResponse = await this.getCard(cardId, retryCount, delay, timeout);
        const cardDetails = cardDetailsResponse.data;

        const labelCreationResponse = await axios.post(`https://api.trello.com/1/cards/${cardId}/labels?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`, {
            name: frontText,
            color: "null",
            pos: "top",
            display_cardFront: "true"
        });

        console.log(`Label ${frontText} added successfully. Response:`, labelCreationResponse.data);

    } catch (error) {
        console.error(`Error adding label ${frontText}:`, error.response ? error.response.data : error.message);
        throw error;
    }
}


  async setCustomField(cardId, customFieldId, valueId, colorV, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      await axios.put(
        `https://api.trello.com/1/cards/${cardId}/customField/${customFieldId}/item?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
        { idValue: valueId,
          color: colorV,
        },
        {
          timeout: timeout,
        }
      );

      console.log('Custom field updated successfully.');
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.setCustomField(cardId, customFieldId, valueId, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error updating custom field:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async setCardDescription(cardId, cardDescription, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      await axios.put(
        `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&desc=${encodeURIComponent(cardDescription)}`,
        null,
        {
          timeout: timeout,
        }
      );

      console.log('Card description updated successfully.');
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.setCardDescription(cardId, cardDescription, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error updating card description:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async createCard(boardId, listId, cardName, cardDescription, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&idBoard=${boardId}&idList=${listId}&name=${encodeURIComponent(cardName)}&desc=${encodeURIComponent(cardDescription)}`,
        null,
        {
          timeout: timeout,
        }
      );

      const createdCard = response.data;
      console.log('Card created successfully:', createdCard);
      return createdCard;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.createCard(boardId, listId, cardName, cardDescription, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error creating card:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async moveCardToList(cardId, listId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.put(
        `https://api.trello.com/1/cards/${cardId}/idList?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
        { value: listId },
        {
          timeout: timeout,
        }
      );

      if (response.data && typeof response.data === 'object') {
        const movedCard = response.data;
        return movedCard;
      } else {
        console.error('Invalid card move response:', response.data);
        throw new Error('Invalid card move response');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.moveCardToList(cardId, listId, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error moving card to list:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async copyCardToList(cardId, listId, copyData, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
        {
          ...copyData,
          idList: listId,
          idCardSource: cardId,
        },
        {
          timeout: timeout,
        }
      );

      if (response.data && typeof response.data === 'object') {
        const copiedCard = response.data;
        return copiedCard;
      } else {
        console.error('Invalid card copy response:', response.data);
        throw new Error('Invalid card copy response');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.copyCardToList(cardId, listId, copyData, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error copying card to list:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  //PUT JSON
  async setJson(cardId, json, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.put(
        `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
        json,
        { timeout }
      );   
      console.log('set json on card,', cardId, '    ; JSON ', json);   

      if (response.data && typeof response.data === 'object') {
        const updatedCard = response.data;
        return updatedCard;
      } else {
        console.error('Invalid card json update response:', response.data);
        throw new Error('Invalid card json update response');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.setJson(cardId, json, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error updating card with json:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  //PUT Card Parameters
  async setCardUpdate(cardId, card, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
        const payload = {
          /*
          location: card.location,
          votes: card.votes,
          viewingMemberVoted: card.viewingMemberVoted,
          subscribed: card.subscribed,
          fogbugz: card.fogbugz,
          checkItems: card.checkItems,
          checkItemsChecked: card.checkItemsChecked,
          checkItemsEarliestDue: card.checkItemsEarliestDue,
          comments: card.comments,
          attachments: card.attachments,
          description: card.description,
          due: card.due,
          dueComplete: card.dueComplete,
          start: card.start,
          checkItemStates: card.checkItemStates,
          closed: card.closed,
          dueComplete: card.dueComplete,
          dateLastActivity: card.dateLastActivity,
          descData: card.descData,
          due: card.due,
          dueReminder: card.dueReminder,
          email: card.email,
          idChecklists: card.idChecklists,
          idMembers: card.idMembers,
          idMembersVoted: card.idMembersVoted,
          idAttachmentCover: card.idAttachmentCover,
          labels: card.labels,
          idLabels: card.idLabels,
          manualCoverAttachment: card.manualCoverAttachment,
          pos: card.pos,
          start: card.start,
          subscribed: card.subscribed,
          cover: card.cover,
          isTemplate: card.isTemplate,
          cardRole: card.cardRole,
          */

          name: card.name,
          desc: card.desc,
          location: card.location,
          votes: card.votes,
        };
        
        // Check and conditionally add properties
        if (card.locationName) {
          payload.locationName = card.locationName;
        }
        
        if (card.coordinates) {
          payload.coordinates = card.coordinates;
        }
        
        // Add other checks for parameters you want to conditionally include
        
        const response = await axios.put(
          `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
          payload,
          { timeout }
        );

      if (response.data && typeof response.data === 'object') {
        const updatedCard = response.data;
        return updatedCard;
      } else {
        console.error('Invalid card update response:', response.data);
        throw new Error('Invalid card update response');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.setCardUpdate(cardId, card, retryCount - 1, delay * 2, timeout);  // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error updating card:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  } 

}

export default RequestInventory;
