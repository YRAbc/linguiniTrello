// main.js
// Made by Yoann Raton, 16/01/2024

// Import the setoAuth class
//import setPowerUp from './authSettings.js';
//import authSettings from './authSettings.js';

// Import the Items class
import Workspace from './workspace.js';
import {opfwsp} from './workspace.js';
import Board from './board.js';
import List from './list.js';
import Card from './card.js';


//Start info
console.log("Start Linguini");

// Call the setPowerUp function from authSettings
//setPowerUp(authSettings.apiKey, authSettings.apiSecret, authSettings.appName, authSettings.authorizeCallback);

// Initialize Trello Power-Up
window.TrelloPowerUp.initialize({
    'board-buttons': function (t, options) {
        // Return an array of board buttons
        return [
            {
                text: 'Add board to workspace OPF',
                callback: function (t) {
                    // Retrieve the board ID
                    const boardId = t.getContext().board;

                    // Retrieve the board name using Trello API
                    t.board('name')
                        .then(function (board) {
                            console.log('Board ID:', boardId);
                            console.log('Board Title:', board.name);

                            // Add the board to the workspace
                            opfwsp.addBoard(new Board(boardId, board.name));
                        })
                        .catch(function (error) {
                            console.error('Error retrieving board information');
                        });
                },
            },
            {
                text: 'Remove board from workspace OPF',
                callback: function (t) {
                    // Retrieve the board ID
                    const boardId = t.getContext().board;

                    // Remove the board from the workspace by ID
                    opfwsp.removeBoardById(boardId);
                },
            }
        ];
    },
});

console.log("End Linguini");
