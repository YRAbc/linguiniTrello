// post.js
// Made by Yoann Raton, 25/01/2024

const axios = require('axios');
import oAuth from './authSettings.js';

class Post {
    constructor(oauth) {
        this.token = oauth.appAccessToken();
        this.apiKey = oauth.apiKey();
      }
      
  async createCard(boardId, listId, cardName, cardDescription) {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${this.apiKey}&token=${this.token}&idBoard=${boardId}&idList=${listId}&name=${encodeURIComponent(cardName)}&desc=${encodeURIComponent(cardDescription)}`
      );

      const createdCard = response.data;
      console.log('Card created successfully:', createdCard);
      return createdCard;
    } catch (error) {
      console.error('Error creating card:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}

export default Post;
