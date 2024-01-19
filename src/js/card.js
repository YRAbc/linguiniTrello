// card.js
// Made by Yoann Raton, 19/01/2024

const Trello = require('trello');

class Card {
  constructor(apiKey, token, listId) {
    this.trello = new Trello(apiKey, token);
    this.listId = listId;
    this.cardId = null;
    this.cardOPFID = null;
    this.cardTitle = null;
    this.cardDescription = null;
    this.cardPriority = null;
    this.cardStatus = null;
    this.cardTech = null;
    this.cardIssuer = null;
  }

  async createCard(cardTitle, cardDescription, cardPriority, cardStatus, cardOPFID, cardTech, cardIssuer) {
    try {
      const newCard = await this.trello.addCard(cardTitle, cardDescription, this.listId);
      this.cardId = newCard.id;
      this.cardOPFID = cardOPFID;
      this.cardTitle = cardTitle;
      this.cardDescription = cardDescription;
      this.cardPriority = cardPriority;
      this.cardStatus = cardStatus;
      this.cardTech = cardTech;
      this.cardIssuer = cardIssuer;
      console.log(`Card '${cardTitle}' created with ID: ${this.cardId}`);
    } catch (error) {
      console.error(`Error creating card: ${error}`);
    }
  }

  async getCardId() {
    return this.cardId;
  }

  async getCardTitle() {
    return this.cardTitle;
  }

  async getCardDescription() {
    return this.cardDescription;
  }

  async getCardPriority() {
    return this.cardPriority;
  }

  async getCardStatus() {
    return this.cardStatus;
  }

  async getCardOPFID() {
    return this.cardOPFID;
  }

  async getCardTech() {
    return this.cardTech;
  }

  async getCardIssuer() {
    return this.cardIssuer;
  }

  async updateCardTitle(newCardTitle) {
    await this.updateCardProperty('cardTitle', newCardTitle);
  }

  async updateCardDescription(newCardDescription) {
    await this.updateCardProperty('cardDescription', newCardDescription);
  }

  async updateCardPriority(newCardPriority) {
    await this.updateCardProperty('cardPriority', newCardPriority);
  }

  async updateCardStatus(newCardStatus) {
    await this.updateCardProperty('cardStatus', newCardStatus);
  }


  async updateCardTech(newCardTech) {
    await this.updateCardProperty('cardTech', newCardTech);
  }

  async updateCardIssuer(newCardIssuer) {
    await this.updateCardProperty('cardIssuer', newCardIssuer);
  }

  async deleteCard() {
    if (!this.cardId) {
      console.error('Card not created yet. Call createCard() first.');
      return;
    }

    try {
      await this.trello.deleteCard(this.cardId);
      console.log(`Card with ID ${this.cardId} deleted.`);
    } catch (error) {
      console.error(`Error deleting card: ${error}`);
    }
  }

  async updateCardProperty(propertyName, propertyValue) {
    if (!this.cardId) {
      console.error('Card not created yet. Call createCard() first.');
      return;
    }

    try {
      // You can customize this based on how you want to update properties
      // For simplicity, I'm using updateCard to update the card name
      await this.trello.updateCardName(this.cardId, propertyValue);

      // Update the property value in the class
      this[propertyName] = propertyValue;

      console.log(`Card ${propertyName} updated to '${propertyValue}'.`);
    } catch (error) {
      console.error(`Error updating ${propertyName}: ${error}`);
    }
  }
}