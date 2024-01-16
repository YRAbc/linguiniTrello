// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Connector class
import Connector from './classes/connector/connector.js';

console.log("Start Linguini");

/*
// Initialize Trello Power-Up
var t = window.TrelloPowerUp.iframe({
  appKey: 'fa9aab0039cce75efc142efc7e65a403',
  appSecret: 'a54e7f3488ca0a442879d97a77b27993e7d6d36',
  appName: 'Linguini for Trello',
  appAuthor: 'Yoann Raton'
});
*/

window.TrelloPowerUp.initialize({
  'card-badges': function(t, opts) {

    console.log("Done");
    return [];
  }
})


console.log("End Linguini");
