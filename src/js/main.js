// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Connector class
import Connector from './classes/connector/connector.js';

console.log("Start Linguini");

window.TrelloPowerUp.initialize({
  'card-badges': function(t, opts) {
    return t.card('all')
    .then(function(card) {
      console.log(card);
      return [
        {
          text: `#OPFTECH-${card.idShort}`,
        },
      ];
    })
  }
});

console.log("End Linguini");
