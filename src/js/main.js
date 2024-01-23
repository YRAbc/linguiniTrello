// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Items class
import Workspace from './workspace.js';
import Board from './board.js';

// Start info
console.log("Start Linguini");

const opfwsp = new Workspace("OpfTechWorkspace");

// Initialize Trello Power-Up
window.TrelloPowerUp.initialize({
    'board-buttons': function (t, options) {
        // Return an array of board buttons
        return [
            {
                text: 'Add',
                callback: function (t) {
                    // Retrieve the board ID
                    const boardId = t.getContext().board;

                    // Retrieve the board name using Trello API
                    t.board('name')
                        .then(function (board) {
                            console.log('Board ID:', boardId);
                            console.log('Board Title:', board.name);

                            // Uncomment the following lines if you want to add the board to the workspace
                            const boardObj = new Board(boardId, board.name);
                            opfwsp.addBoard(boardObj);

                            // Print the properties
                            console.log('Board ID:', boardObj.id);
                            console.log('Board Title:', boardObj.name);
                        })
                        .catch(function (error) {
                            console.error('Error retrieving board information:', error);
                        });
                },
            },
            {
                text: 'Remove',
                callback: function (t) {
                    // Retrieve the board ID
                    boardId = t.getContext().board;
                    opfwsp.removeBoardById(boardId);
                },
            },
            {
                text: 'display',
                callback: function (t) {
                    // Retrieve the board ID
                    opfwsp.printBoards();
                },
            }
        ];
    },
});

console.log("End Linguini");
