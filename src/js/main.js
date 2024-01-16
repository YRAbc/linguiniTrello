// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Connector class
import Connector from './classes/connector/connector.js';

// Create an instance of the Connector
const connector = new Connector();

// Call onPowerUpInit with the required Trello arguments
connector.onPowerUpInit(t, options);
