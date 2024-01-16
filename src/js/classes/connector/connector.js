// connector.js
// Made by Yoann Raton, 16/01/2024

export default class Connector {
    constructor() {
      this.boards = []; // Array to store information about boards
    }
  
    // This method is called when the Power-Up is initialized
    async onPowerUpInit(t, options) {
      // ... (existing code)
  
      // Add card-badges capability to display ID as a badge on the card
      await window.TrelloPowerUp.initialize({
        'card-badges': async (t, opts) => await this.handleCardBadges(t, opts),
      });
    }
  
    // Handle card badges
    async handleCardBadges(t, opts) {
      const card = await t.card('all');
      console.log(card);
      
      return [
        {
          text: `#OPFTECH-${card.idShort}`,
        },
      ];
    }
  
    // Add other methods and properties as needed
  }
  