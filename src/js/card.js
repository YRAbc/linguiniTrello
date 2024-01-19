// card.js
// Made by Yoann Raton, 19/01/2024

class Card {
  constructor() { // TO DO
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

}