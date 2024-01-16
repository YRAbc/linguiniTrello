// card.js
// Made by Yoann Raton, 16/01/2024

export default class Card {
    constructor(id, cardNumber, title, description) {
      this.id = id;
      this.cardNumber = cardNumber;
      this.title = title;
      this.description = description;
    }
  
    // Other methods and properties specific to a card
    // For example, you might add methods to update the card details
    updateTitle(newTitle) {
      this.title = newTitle;
    }
  
    updateDescription(newDescription) {
      this.description = newDescription;
    }
  }
  