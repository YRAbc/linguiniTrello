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
                    let boardId = t.getContext().board;

                    // Retrieve the board name using Trello API
                    t.board('name')
                        .then(function (board) {
                            const id = boardId;
                            const nam = board.name;

                            if (id && nam) {
                                // add the board to the workspace
                                const boardObj = new Board(id, nam);
                                opfwsp.addBoard(boardObj);
                                opfwsp.printBoards();
                            }
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
                    let boardId = t.getContext().board;
                    opfwsp.removeBoardById(boardId);
                },
            }
        ];
    },
});

console.log("End Linguini");
