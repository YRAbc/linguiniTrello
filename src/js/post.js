// post.js
// Made by Yoann Raton, 25/01/2024

import axios from 'axios';
import oAuth from './authSettings.js';

class Post {
  constructor(oauth) {
    this.oauth = oauth;
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

  async copyCardToList(cardId, targetListId) {
    try {
      // Get details of the existing card
      const cardDetailsResponse = await axios.get(
        `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`
      );

      const cardDetails = cardDetailsResponse.data;

      // Create a new card in the target list
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&idList=${targetListId}&name=${encodeURIComponent(cardDetails.name)}&desc=${encodeURIComponent(cardDetails.desc)}`
      );

      const copiedCard = response.data;
      console.log('Card copied successfully:', copiedCard);
      return copiedCard;
    } catch (error) {
      console.error('Error copying card:', error.response ? error.response.data : error.message);
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

  async setCustomField(cardId, fieldName, fieldValue) {
    try {
        // Fetch the current custom fields data for the card
        const customFieldsResponse = await axios.get(
            `https://api.trello.com/1/cards/${cardId}/customFieldItems?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`
        );

        const customFields = customFieldsResponse.data;

        console.log('Fetched custom fields data:', customFields);

        // Check if the custom field already exists
        const existingField = customFields.find(field => field.name === fieldName);

        if (existingField) {
            // If the custom field exists, update the value
            const customFieldId = existingField.id;
            await axios.put(
                `https://api.trello.com/1/card/${cardId}/customField/${customFieldId}/item?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
                { value: { text: fieldValue } }
            );

            console.log(`Updated existing custom field ${fieldName} with value ${fieldValue}`);
        } else {
            // If the custom field doesn't exist, create it
            await axios.post(
                `https://api.trello.com/1/card/${cardId}/customField/${fieldName}/item?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
                { value: { text: fieldValue } }
            );

            console.log(`Created new custom field ${fieldName} with value ${fieldValue}`);
        }

        console.log(`Card ${fieldName} updated successfully.`);
    } catch (error) {
        console.error(`Error updating card ${fieldName}:`, error.response ? error.response.data : error.message);
        throw error;
    }
}



  async addOPFTechNumber(cardId, opfTechNumber) {
    try {
        const frontText = `#OPFTech-${opfTechNumber}`;
        
        const cardDetailsResponse = await axios.get(
            `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`
        );

        const cardDetails = cardDetailsResponse.data;

        const existingLabel = cardDetails.labels.find(label => label.name === frontText);

        if (!existingLabel) {
            const labelCreationResponse = await axios.post(
                `https://api.trello.com/1/cards/${cardId}/labels?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
                { name: frontText, color: "null" , pos: "top" }
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

}

export default Post;
