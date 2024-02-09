// requestInventory.js
// Made by Yoann Raton, 25/01/2024

import axios from 'axios';
import oAuth from './authSettings.js';

class RequestInventory {
  constructor() {
    this.oauth = new oAuth();
    this.defaultTimeout = 10000; 

  }

  /* ITEMS GETTERS */
  async getBoard(boardId, retryCount = 3, delay = 1000) {
    try {
      const response = await axios.get(`https://api.trello.com/1/boards/${boardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`);
      
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
      const response = await axios.get(`https://api.trello.com/1/lists/${listId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`);
      
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
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}?fields=all&customFieldItems=true&key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`);
      
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

  async getCardInBoardWithNumber(boardId, opfTechNumber, retryCount = 3, delay = 1000) {
    try {
      const response = await this.getBoardCards(boardId);
      // Check if response is not empty
      if (response && response.length > 0) {
        for (const cardDetails of response) {
          // Check if the OPFTech label exists on the card
          const opfTechLabel = cardDetails.labels.find(label => label.name.startsWith('#OPFTech-'));
          if (opfTechLabel) {
            // Extract the number from the label
            const number = opfTechLabel.name.replace('#OPFTech-', '');
            // Check if the number matches the opfTechNumber
            if (number === opfTechNumber) {
              return cardDetails; // Return the card if number matches
            }
          }
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getCardInBoardWithNumber(boardId, opfTechNumber, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting board lists:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
    // Return null if card with opfTechNumber is not found
    return null;
  }
  

  async getBoardLists(boardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`, {
        timeout: timeout
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
      const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`, {
        timeout: timeout
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
      const response = await axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`, {
        timeout: timeout
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
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`, {
        timeout: timeout
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
      const response = await axios.get(`https://api.trello.com/1/lists/${listId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`);

      if (response.data && typeof response.data === 'object') {
        const list = response.data;
        const boardId = list.idBoard;

        const boardResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`);

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
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`);

      if (response.data && typeof response.data === 'object') {
        const card = response.data;
        const boardId = card.idBoard;

        const boardResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`);

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



  /* CARD CHARACTERISTIC GETTERS */
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
          const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`);
          const cards = response.data;

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

          //console.log('Max OPFTechNumber:', maxOPFTechNumber);
          return maxOPFTechNumber;
        } catch (error) {
          if (error.response && error.response.status === 429) {
            // Handle rate limiting
            if (retryCount > 0) {
              console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
              await new Promise(resolve => setTimeout(resolve, delay));
              return this.getOPFTechMaxNumber(boardId, retryCount - 1, delay * 2, timeout); // Exponential backoff
            } else {
              console.error('Exceeded maximum retry attempts. Aborting.');
              throw error;
            }
          } else {
            console.error('Error getting max OPF Tech Number:', error.response ? error.response.data : error.message);
            throw error;
          }
        }
    }

  async getCustomField(cardId, fieldName, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}/customFields?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`, {
        timeout: timeout
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

  async getCustomFields(cardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}/customFields?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`, {
        timeout: timeout
      });

        return response.data;
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

  async getCardCustomFieldValue(cardId, customFieldId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/cards/${cardId}/customField/${customFieldId}/item?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
        {
          timeout: timeout
        }
      );
  
      const customFieldValue = response.data.value;
      return customFieldValue;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getCardCustomFieldValue(cardId, customFieldId, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting custom field value:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }  

  async getCardAttachments(cardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/cards/${cardId}/attachments?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
        {
          timeout: timeout
        }
      );
  
      const attachments = response.data;
      return attachments;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getCardAttachments(cardId, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting card attachments:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async getCardAttachment(cardId, attachmentId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/cards/${cardId}/attachments/${attachmentId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
        {
          timeout: timeout
        }
      );
  
      const attachment = response.data;
      return attachment;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        if (retryCount > 0) {
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.getCardAttachment(cardId, attachmentId, retryCount - 1, delay * 2, timeout); // Exponential backoff
        } else {
          console.error('Exceeded maximum retry attempts. Aborting.');
          throw error;
        }
      } else {
        console.error('Error getting card attachment:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }

  async getCardCheckLists(cardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
        const response = await axios.get(
            `https://api.trello.com/1/cards/${cardId}/checklists?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
            {
                timeout: timeout
            }
        );

        const checkLists = response.data;
        return checkLists;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Handle rate limiting
            if (retryCount > 0) {
                console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.getCardCheckLists(cardId, retryCount - 1, delay * 2, timeout); // Exponential backoff
            } else {
                console.error('Exceeded maximum retry attempts. Aborting.');
                throw error;
            }
        } else {
            console.error('Error getting card checklists:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
  }

  async getCardCheckList(cardId, checkListId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
          const response = await axios.get(
              `https://api.trello.com/1/cards/${cardId}/checklists/${checkListId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
              {
                  timeout: timeout
              }
          );

          const checkList = response.data;
          return checkList;
      } catch (error) {
          if (error.response && error.response.status === 429) {
              // Handle rate limiting
              if (retryCount > 0) {
                  console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return this.getCardCheckList(cardId, checkListId, retryCount - 1, delay * 2, timeout); // Exponential backoff
              } else {
                  console.error('Exceeded maximum retry attempts. Aborting.');
                  throw error;
              }
          } else {
              console.error('Error getting card checklist:', error.response ? error.response.data : error.message);
              throw error;
          }
      }
  }

  async getCheckListItems(checkListId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
        const response = await axios.get(
            `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
            {
                timeout: timeout
            }
        );

        const checkListItems = response.data;
        return checkListItems;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Handle rate limiting
            if (retryCount > 0) {
                console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.getCheckListItems(checkListId, retryCount - 1, delay * 2, timeout); // Exponential backoff
            } else {
                console.error('Exceeded maximum retry attempts. Aborting.');
                throw error;
            }
        } else {
            console.error('Error getting checklist items:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
  }

  async getCheckListItem(checkListId, checkItemId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
          const response = await axios.get(
              `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
              {
                  timeout: timeout
              }
          );

          const checkListItem = response.data;
          return checkListItem;
      } catch (error) {
          if (error.response && error.response.status === 429) {
              // Handle rate limiting
              if (retryCount > 0) {
                  console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return this.getCheckListItem(checkListId, checkItemId, retryCount - 1, delay * 2, timeout); // Exponential backoff
              } else {
                  console.error('Exceeded maximum retry attempts. Aborting.');
                  throw error;
              }
          } else {
              console.error('Error getting checklist item:', error.response ? error.response.data : error.message);
              throw error;
          }
      }
  }

    
  /* SET CARD CHARACTERISTICS */
  // POST
  async addOPFTechNumber(cardId, opfTechNumber, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      let frontText;
      try {
          frontText = `#OPFTech-${opfTechNumber}`;

          // Get the card details with retry logic and custom timeout
          const cardDetailsResponse = await this.getCard(cardId, retryCount, delay, timeout);
          const cardDetails = cardDetailsResponse.data;

          const labelCreationResponse = await axios.post(`https://api.trello.com/1/cards/${cardId}/labels?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`, {
              name: frontText,
              color: "null",
              pos: "top",
              display_cardFront: "true"
          });

          //console.log(`Label ${frontText} added successfully. Response:`, labelCreationResponse.data);

          return labelCreationResponse.data;
      } catch (error) {
          console.error(`Error adding label ${frontText}:`, error.response ? error.response.data : error.message);
          throw error;
      }
  }

  async setCustomField(cardId, customFieldId, valueId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
        const response = await axios.put(
          `https://api.trello.com/1/cards/${cardId}/customField/${customFieldId}/item?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
          { idValue: valueId },
          { timeout: timeout }
        );

        return response;
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
        const response = await axios.put(
          `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}&desc=${encodeURIComponent(cardDescription)}`,
          null,
          { timeout: timeout }
        );

        return response;
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

  async addCardAttachment(cardId, attachmentName, attachmentUrl, mimeType = "url", retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
        const response = await axios.post(
          `https://api.trello.com/1/cards/${cardId}/attachments?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
          {
            name: attachmentName,
            url: attachmentUrl,
            mimeType: mimeType,
          },
          {
            timeout: timeout
          }
        );

        const newAttachment = response.data;
        return newAttachment;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Handle rate limiting
          if (retryCount > 0) {
            console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return this.addCardAttachment(cardId, attachmentName, attachmentUrl, mimeType, retryCount - 1, delay * 2, timeout); // Exponential backoff
          } else {
            console.error('Exceeded maximum retry attempts. Aborting.');
            throw error;
          }
        } else {
          console.error('Error adding card attachment:', error.response ? error.response.data : error.message);
          throw error;
        }
      }
  }

  async removeCardAttachment(cardId, attachmentId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
        const response = await axios.delete(
          `https://api.trello.com/1/cards/${cardId}/attachments/${attachmentId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
          {
            timeout: timeout
          }
        );
    
        // If the response status is 200 OK, the attachment is successfully deleted
        if (response.status === 200) {
          return { success: true};
        } else {
          throw new Error(`Failed to remove attachment: ${attachmentId}`);
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Handle rate limiting
          if (retryCount > 0) {
            console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return this.removeCardAttachment(cardId, attachmentId, retryCount - 1, delay * 2, timeout); // Exponential backoff
          } else {
            console.error('Exceeded maximum retry attempts. Aborting.');
            throw error;
          }
        } else {
          console.error('Error removing card attachment:', error.response ? error.response.data : error.message);
          throw error;
        }
      }
  }

  async updateCardChecklist(mainCardId, duplicateCardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
          // Get the main card's checklists
          const mainCardChecklists = await this.getCardCheckLists(mainCardId);

          // Remove all checklists from the duplicate card
          const duplicateCardChecklists = await this.getCardCheckLists(duplicateCardId);
          for (const checklist of duplicateCardChecklists) {
              await this.removeChecklistFromCard(duplicateCardId, checklist.id, retryCount, delay, timeout);
          }

          // Add main card's checklists to the duplicate card
          for (const mainChecklist of mainCardChecklists) {
              // Add the checklist to the duplicate card
              const newChecklist = await this.addChecklistToCard(duplicateCardId, mainChecklist, retryCount, delay, timeout);

              // Get the checklist items from the main checklist
              const mainChecklistItems = await this.getCheckListItems(mainChecklist.id);
              for (const item of mainChecklistItems) {
                  // Add each checklist item to the newly added checklist on the duplicate card
                  await this.addChecklistItemToChecklist(newChecklist.id, item.name, item.checked, retryCount, delay, timeout);
              }
          }

          //console.log(`Checklists and checklist items replaced successfully for card ${duplicateCardId}`);
      } catch (error) {
          if (error.response && error.response.status === 429) {
              // Handle rate limiting
              if (retryCount > 0) {
                  console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return this.replaceCardChecklist(mainCardId, duplicateCardId, retryCount - 1, delay * 2, timeout); // Exponential backoff
              } else {
                  console.error('Exceeded maximum retry attempts. Aborting.');
                  throw error;
              }
          } else {
              console.error('Error replacing card checklists:', error.response ? error.response.data : error.message);
              throw error;
          }
      }
  }

  
  async addChecklistToCard(cardId, checklist, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
          const response = await axios.post(
              `https://api.trello.com/1/cards/${cardId}/checklists?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
              {
                  name: checklist.name, // Assuming checklist has a 'name' property
                  // Add other properties of the checklist if required
              },
              {
                  timeout: timeout
              }
          );

          const newChecklist = response.data;
          return newChecklist;
      } catch (error) {
          if (error.response && error.response.status === 429) {
              // Handle rate limiting
              if (retryCount > 0) {
                  console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return this.addChecklistToCard(cardId, checklist, retryCount - 1, delay * 2, timeout); // Exponential backoff
              } else {
                  console.error('Exceeded maximum retry attempts. Aborting.');
                  throw error;
              }
          } else {
              console.error('Error adding checklist to card:', error.response ? error.response.data : error.message);
              throw error;
          }
      }
  }

  async removeChecklistFromCard(cardId, checklistId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
        // Delete the checklist associated with the card
        await axios.delete(
            `https://api.trello.com/1/checklists/${checklistId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
            {
                timeout: timeout
            }
        );

        console.log(`Checklist removed successfully from card ${cardId}`);
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Handle rate limiting
            if (retryCount > 0) {
                console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.removeChecklistFromCard(cardId, checklistId, retryCount - 1, delay * 2, timeout); // Exponential backoff
            } else {
                console.error('Exceeded maximum retry attempts. Aborting.');
                throw error;
            }
        } else {
            console.error('Error removing checklist from card:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
  }

  async addChecklistItemToChecklist(checkListId, itemData, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
          const response = await axios.post(
              `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
              {
                  id: itemData.id,
                  name: itemData.name,
                  pos: itemData.pos,
                  state: itemData.state,
                  due: itemData.due,
                  dueReminder: itemData.dueReminder,
                  idMember: itemData.idMember,
                  idChecklist: itemData.idChecklist
              },
              {
                  timeout: timeout
              }
          );

          const newItem = response.data;
          return newItem;
      } catch (error) {
          if (error.response && error.response.status === 429) {
              // Handle rate limiting
              if (retryCount > 0) {
                  console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return this.addChecklistItemToChecklist(checkListId, itemData, retryCount - 1, delay * 2, timeout); // Exponential backoff
              } else {
                  console.warn('Exceeded maximum retry attempts. Aborting.');
                  throw error;
              }
          } else {
              console.warn('Error adding checklist item:', error.response ? error.response.data : error.message);
              throw error;
          }
      }
  }

  async removeChecklistItemFromChecklist(checkListId, checkItemId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
          await axios.delete(
              `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
              {
                  timeout: timeout
              }
          );

          console.log(`Checklist item removed successfully from checklist ${checkListId}`);
      } catch (error) {
          if (error.response && error.response.status === 429) {
              // Handle rate limiting
              if (retryCount > 0) {
                  console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return this.removeChecklistItemFromChecklist(checkListId, checkItemId, retryCount - 1, delay * 2, timeout); // Exponential backoff
              } else {
                  console.error('Exceeded maximum retry attempts. Aborting.');
                  throw error;
              }
          } else {
              console.error('Error removing checklist item:', error.response ? error.response.data : error.message);
              throw error;
          }
      }
  }

    /* PUT */
  //PUT JSON
  async setJson(cardId, json, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
        const response = await axios.put(
          `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
          json,
          { timeout }
        );   
        //console.log('set json on card,', cardId, '    ; JSON ', json);   

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
        const payload = {};
        const propertiesToCheck = ['name', 'desc', 'location', 'locationName', 'coordinates',
                                  'votes', 'viewingMemberVoted', 'subscribed', 'fogbugz', 'checkItems',
                                  'checkItemsChecked', 'checkItemsEarliestDue', 'comments', 'attachments',
                                  'description', 'due', 'dueComplete', 'start', 'closed', 'dateLastActivity',
                                  'descData', 'dueReminder', 'members', 'email', 'idMembers', 'idMembersVoted',
                                  'idAttachmentCover', 'manualCoverAttachment', 'pos', 'subscribed', 'cover',
                                  'isTemplate', 'cardRole',
                                  'checklist'
                                ];

        // Check and conditionally add properties
        for (const property of propertiesToCheck) {
          if (card[property]) {
            payload[property] = card[property];
          }
        }
        
        const response = await axios.put(
          `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
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




  /* CARD ACTIONS */
  async createCard(boardId, listId, cardName, cardDescription, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}&idBoard=${boardId}&idList=${listId}&name=${encodeURIComponent(cardName)}&desc=${encodeURIComponent(cardDescription)}`,
        null,
        {
          timeout: timeout
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
          `https://api.trello.com/1/cards/${cardId}/idList?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
          { value: listId },
          {
            timeout: timeout
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
          `https://api.trello.com/1/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
          {
            ...copyData,
            idList: listId,
            idCardSource: cardId,
          },
          {
            timeout: timeout
          }
        );

        if (response.data && typeof response.data === 'object') {
          const copiedCard = response.data;
          // Add source property to the response
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

  async archiveCard(cardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
          const response = await axios.put(
              `https://api.trello.com/1/cards/${cardId}/closed?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
              { value: true },
              {
                  timeout: timeout
              }
          );

          if (response.status === 200) {
              console.log(`Card with ID ${cardId} archived successfully.`);
          } else {
              console.error('Invalid card archiving response:', response.data);
              throw new Error('Invalid card archiving response');
          }
      } catch (error) {
          if (error.response && error.response.status === 429) {
              // Handle rate limiting
              if (retryCount > 0) {
                  console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return this.archiveCard(cardId, retryCount - 1, delay * 2, timeout); // Exponential backoff
              } else {
                  console.error('Exceeded maximum retry attempts. Aborting.');
                  throw error;
              }
          } else {
              console.error('Error archiving card:', error.response ? error.response.data : error.message);
              throw error;
          }
      }
  }

  async deleteCard(cardId, retryCount = 3, delay = 1000, timeout = this.defaultTimeout) {
      try {
        const response = await axios.delete(
          `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&source=${this.oauth.appName}`,
          {
            timeout: timeout
          }
        );

        if (response.status === 200) {
          console.log(`Card with ID ${cardId} deleted successfully.`);
        } else {
          console.error('Invalid card deletion response:', response.data);
          throw new Error('Invalid card deletion response');
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Handle rate limiting
          if (retryCount > 0) {
            console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds. Retries left: ${retryCount}`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return this.deleteCard(cardId, retryCount - 1, delay * 2, timeout); // Exponential backoff
          } else {
            console.error('Exceeded maximum retry attempts. Aborting.');
            throw error;
          }
        } else {
          console.error('Error deleting card:', error.response ? error.response.data : error.message);
          throw error;
        }
      }
    }


}

export default RequestInventory;
