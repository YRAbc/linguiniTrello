// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Connector class
import Connector from './classes/connector/connector.js';

console.log("Start Linguini");

var t = window.TrelloPowerUp.iframe({
  appKey: 'fa9aab0039cce75efc142efc7e65a403',
  appName: 'Linguini for Trello',
  appAuthor: 'Yoann Raton'
});

// Initialize TrelloPowerUp
window.TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    return t.getRestApi()
      .isAuthorized()
      .then(function(isAuthorized) {
        if (isAuthorized) {
          return [{
            text: 'David\'s Power-Up',
            callback: showMenu
          }];
        } else {
          return [{
            text: 'David\'s Power-Up',
            callback: showIframe
          }];
        }
      });
  }
}, {
  appKey: 'fa9aab0039cce75efc142efc7e65a403',
  appName: 'Linguini for Trello',
  appAuthor: 'Yoann Raton'
});

