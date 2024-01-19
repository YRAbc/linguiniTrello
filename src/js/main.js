// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Connector class
import authSettings from './authSettings.js';  // Corrected import path

console.log("Start Linguini");

// Call the setPowerUp function from authSettings
authSettings.setPowerUp(authSettings.apiKey, authSettings.apiSecret, authSettings.yourAppName, authSettings.yourAuthorizeCallback);

console.log("End Linguini");
