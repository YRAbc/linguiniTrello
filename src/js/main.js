// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Connector class
import setPowerUp from './authSettings.js';
import authSettings from './authSettings.js';

console.log("Start Linguini");

// Call the setPowerUp function from authSettings
//setPowerUp(authSettings.apiKey, authSettings.apiSecret, authSettings.appName, authSettings.authorizeCallback);

// Initialize Trello Power-Up
window.TrelloPowerUp.initialize({
    'board-buttons': function (t, options) {
        // Return a board button
        return [{
            text: 'Send Board Info',
            callback: function (t) {
                // Handle the button click event
                sendBoardInformation(t);
            },
        }];
    },
});

function sendBoardInformation(t) {
    // Get board information
    const board = t.board('id', 'name', 'desc', 'url');

    // Prepare data to be sent to the API
    const data = {
        boardId: board.id,
        boardName: board.name,
        boardDescription: board.desc,
        boardUrl: board.url,
    };

    // Make a POST request to your API
    fetch('https://linguini-trello.vercel.app/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        // Handle the response from the API
        console.log('API Response:', responseData);

        // Optionally, show a notification to the user
        t.alert({
            message: 'Board information sent successfully!',
            duration: 3,
        });
    })
    .catch(error => {
        // Handle any errors
        console.error('Error sending board information:', error);

        // Optionally, show an error notification to the user
        t.alert({
            message: 'Error sending board information. Please try again.',
            duration: 3,
            display: 'error',
        });
    });
}


console.log("End Linguini");
