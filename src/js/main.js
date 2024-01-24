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
                                boardObj.getLists();
                                opfwsp.addBoard(boardObj);
                                opfwsp.printBoards();
                            }
                        })
                        .catch(function (error) {
                            console.error('Error retrieving board information:', error);
                        });

                    // Use t to get information about lists on the board
                    t.lists('all')
                        .then(function (lists) {
                            // 'lists' will be an array containing information about each list
                            // Each element of the array will have a 'name' property
                            console.log(lists);
                        })
                        .catch(function (error) {
                            console.error('Error fetching lists:', error);
                        });
                },
            },
            {
                text: 'Remove',
                callback: function (t) {
                    // Retrieve the board ID
                    let boardId = t.getContext().board;
                    if (boardId)
                    {
                        opfwsp.removeBoardById(boardId);
                    }
                },
            }
        ];
    },
});

console.log("End Linguini");
