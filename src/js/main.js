// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Connector class
import Connector from './classes/connector/connector.js';

console.log("Start Linguini");

var t = window.TrelloPowerUp.iframe({
  appKey: 'fa9aab0039cce75efc142efc7e65a403',
  appSecret: 'a54e7f3488ca0a442879d97a77b27993e7d6d36',
  appName: 'Linguini for Trello',
  appAuthor: 'Yoann Raton'
});

//Connection security for server
const serverUrl = 'https://linguini-trello.vercel.app/'; // Replace with your actual server URL
const signedUrl = t.signUrl(serverUrl);
window.location.href = signedUrl;


// Now you can use the signed URL for secure navigation
window.open(signedUrl, '_blank');

// If you have a specific use case, replace the example with your actual code
// ...

// Initialize your Connector class with Trello context
const connector = new Connector();

// Rest of your code...


console.log("End Linguini");