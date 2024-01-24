// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Items class
import Workspace from './workspace.js';
import Board from './board.js';
import List from './list.js';
import Card from './card.js';


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

                                // Use t to get information about lists on the board
                                t.lists('all')
                                .then(function (lists) {
                                    // Create a list object for each Trello list
                                    const listObjects = lists.map((list) => {
                                        const listObj = new List(list.id, list.name);

                                        // For each card in the Trello list, create a Card object and add it to the list
                                        list.cards.forEach((card) => {
                                            const cardObj = new Card(card.id, card.name, list.id, list.name);
                                            listObj.addCard(cardObj);
                                        });

                                        return listObj;
                                    });

                                    // Set the lists for the board object
                                    boardObj.setLists(listObjects);
                                    opfwsp.addBoard(boardObj);
                                    opfwsp.printBoards();
                                })
                                .catch(function (error) {
                                    console.error('Error fetching lists:', error);
                                });
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
