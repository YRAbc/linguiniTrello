// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Connector class
import Connector from './classes/connector/connector.js';

// Initialize TrelloPowerUp
TrelloPowerUp.initialize({
  'connector': function (t, options) {
    const connector = new Connector();
    connector.onPowerUpInit(t, options);
    return connector;
  },
  // other Power-Up capabilities...
});
