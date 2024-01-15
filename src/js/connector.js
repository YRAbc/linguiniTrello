// connector.js

// Print a message to the console when the Power-Up is loaded
console.log('Trello Power-Up Connector is loaded!');

// Add any additional code or functionality here
window.TrelloPowerUp.initialize({
    'card-badges': function(t, opts) {
        return[];
    }
});
