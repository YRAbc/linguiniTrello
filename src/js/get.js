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
      
      console.log('Full response:', response); // Log the entire response
      
      if (response.data && typeof response.data === 'object') {
        const board = response.data;
        console.log('Board information:', board);
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

}

export default Get;