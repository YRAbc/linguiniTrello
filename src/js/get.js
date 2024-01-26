// get.js
// Made by Yoann Raton, 25/01/2024

import axios from 'axios';
import oAuth from './authSettings.js';

class Get {
  constructor(oauth) {
    this.oauth = oauth;
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
}

export default Get;
