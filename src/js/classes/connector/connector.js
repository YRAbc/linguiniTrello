// connector.js

// Print a message to the console when the Power-Up is loaded
console.log('Trello Power-Up Connector is loaded!');

// Trello API key
const apiKey = 'fa9aab0039cce75efc142efc7e65a403';

// Initialize Trello Power-Up
window.TrelloPowerUp.initialize({
  'board-buttons': function (t, options) {
    return [{
      icon: {
        dark: 'https://linguini-trello.vercel.app/src/image/icon.jpg',
        light: 'https://linguini-trello.vercel.app/src/image/icon.jpg'
      },
      text: 'Custom Button',
      callback: function (t) {
        // Your button functionality
        console.log('Button clicked!');
      }
    }];
  },
  'card-buttons': function (t, options) {
    return [{
      icon: {
        dark: 'https://linguini-trello.vercel.app/src/image/icon.jpg',
        light: 'https://linguini-trello.vercel.app/src/image/icon.jpg'
      },
      text: 'Custom Card Button',
      callback: function (t) {
        // Your card button functionality
        console.log('Card button clicked!');
      }
    }];
  }
});
