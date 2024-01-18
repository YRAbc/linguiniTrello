// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Connector class
import Connector from './classes/connector/connector.js';

console.log("Start Linguini");

window.TrelloPowerUp.initialize({
  'board-buttons': function(t, opts) {
    // Get the Trello API key and token from the context
    const apiKey = t.arg('afa9aab0039cce75efc142efc7e65a403');
    const orgIdOrName = 'Linguini Tests';  // Replace with your actual organization ID or name

    // Make a request to the Trello API to get boards in the workspace
    const apiUrl = `https://api.trello.com/1/organizations/${orgIdOrName}/boards?key=${apiKey}`;

    return axios.get(apiUrl)
      .then(response => {
        // Handle the response data
        const boards = response.data;

        // Log the boards to the console
        boards.forEach(board => {
          console.log(`Board: ${board.name}, ID: ${board.id}`);
        });

        // Return an empty array as there are no badges to display
        return [];
      })
      .catch(error => {
        console.error('Error fetching boards:', error.response ? error.response.data : error.message);
        // Return an empty array or handle the error as needed
        return [];
      });
  }
});



console.log("End Linguini");
