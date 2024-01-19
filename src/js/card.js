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

  getCardId() {
    return this.cardId;
  }

  getCardTitle() {
    return this.cardTitle;
  }

  getCardDescription() {
    return this.cardDescription;
  }

  getCardPriority() {
    return this.cardPriority;
  }

  getCardStatus() {
    return this.cardStatus;
  }

  getCardOPFID() {
    return this.cardOPFID;
  }

  getCardTech() {
    return this.cardTech;
  }

  getCardIssuer() {
    return this.cardIssuer;
  }

  updateCardTitle(newCardTitle) {
    this.updateCardProperty('cardTitle', newCardTitle);
  }

  updateCardDescription(newCardDescription) {
    this.updateCardProperty('cardDescription', newCardDescription);
  }

  updateCardPriority(newCardPriority) {
    this.updateCardProperty('cardPriority', newCardPriority);
  }

  updateCardStatus(newCardStatus) {
    this.updateCardProperty('cardStatus', newCardStatus);
  }


  updateCardTech(newCardTech) {
    this.updateCardProperty('cardTech', newCardTech);
  }

  updateCardIssuer(newCardIssuer) {
    this.updateCardProperty('cardIssuer', newCardIssuer);
  }

  deleteCard() {
    if (!this.cardId) {
      console.error('Card not created yet. Call createCard() first.');
      return;
    }

    try {
      this.trello.deleteCard(this.cardId);
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
      this.trello.updateCardName(this.cardId, propertyValue);

      // Update the property value in the class
      this[propertyName] = propertyValue;

      console.log(`Card ${propertyName} updated to '${propertyValue}'.`);
    } catch (error) {
      console.error(`Error updating ${propertyName}: ${error}`);
    }
  }
}