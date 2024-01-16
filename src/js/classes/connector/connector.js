// connector.js
// Made by Yoann Raton, 16/01/2024

export default class Connector {
    constructor() {
      this.boards = []; // Array to store information about boards
    }
  
    // This method is called when the Power-Up is initialized
    onPowerUpInit(t, options) {
      // ... (existing code)
  
      // Add a listener for card creation events
      t.card('created', (card) => {
        // Handle card creation event
        this.handleCardCreation(t, card);
      });
    }
  
    // Handle card creation event
    handleCardCreation(t, card) {
      // Add logic to modify card badges when a card is created
      const badgeText = 'New Card';
      const badgeColor = 'green';
  
      // Set the badge on the card
      t.set('card', 'shared', 'badge', {
        text: badgeText,
        color: badgeColor,
      });
  
      console.log(`Badge added to card ${card.id}: ${badgeText} (${badgeColor})`);
    }
  
    // Add other methods and properties as needed
  }
  