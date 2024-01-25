// get.js
// Made by Yoann Raton, 25/01/2024

const axios = require('axios');
import oAuth from './authSettings.js';

class Get {
  constructor(oauth) {
    this.token = oauth.appAccessToken();
    this.apiKey = oauth.apiKey();
  }

  async getBoard(boardId) {
    try {
      const response = await axios.get(`https://api.trello.com/1/boards/${boardId}?key=${this.apiKey}&token=${this.token}`);
      const board = response.data;
      console.log('Board information:', board);
      return board;
    } catch (error) {
      console.error('Error getting board:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getBoardLists(boardId) {
    try {
      const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${this.apiKey}&token=${this.token}`);
      const lists = response.data;
      console.log('Lists on the board:', lists);
      return lists;
    } catch (error) {
      console.error('Error getting lists on the board:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getList(listId) {
    try {
      const response = await axios.get(`https://api.trello.com/1/lists/${listId}?key=${this.apiKey}&token=${this.token}`);
      const list = response.data;
      console.log('List information:', list);
      return list;
    } catch (error) {
      console.error('Error getting list:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getListCards(listId) {
    try {
      const response = await axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${this.apiKey}&token=${this.token}`);
      const cards = response.data;
      console.log('Cards in the list:', cards);
      return cards;
    } catch (error) {
      console.error('Error getting cards in the list:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getCard(cardId) {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}?key=${this.apiKey}&token=${this.token}`);
      const card = response.data;
      console.log('Card information:', card);
      return card;
    } catch (error) {
      console.error('Error getting card:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}

export default Get;
