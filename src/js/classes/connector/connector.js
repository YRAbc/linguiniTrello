// connector.js
// Made by Yoann Raton, 16/01/2024

export default class Connector {
    constructor() {
      this.boards = []; // Array to store information about boards
    }
  
    // This method is called when the Power-Up is initialized
    onPowerUpInit(t, options) {
      // ... (existing code)
  
      // Add card-badges capability to display ID as a badge on the card
      window.TrelloPowerUp.initialize({
        'card-badges': (t, opts) => this.handleCardBadges(t, opts),
      });
    }
  
    // Handle card badges
    handleCardBadges(t, opts) {
      return t.card('all')
        .then((card) => {
          console.log(card);
          return [
            {
              text: `#OPFTECH-${card.idShort}`,
            },
          ];
        });
    }
  
    // Add other methods and properties as needed
  }
  
  