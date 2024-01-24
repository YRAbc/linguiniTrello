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
        // Retrieve the board ID
        let boardId = t.getContext().board;

        // Check if the flag has been set
        return t.get('board', 'private', 'initPowerUp')
            .then(initPowerUp => {
                if (!initPowerUp) {
                    // Retrieve the board name using Trello API
                    return t.board('name')
                        .then(function (board) {
                            const id = boardId;
                            const nam = board.name;

                            if (id && nam) {
                                // add the board to the workspace
                                const boardObj = new Board(id, nam);

                                // Use t to get information about lists on the board
                                return t.lists('all')
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

                                        // Set the flag to indicate that the initialization has been done
                                        return t.set('board', 'private', 'initPowerUp', true)
                                            .then(function () {
                                                return [];
                                            });
                                    })
                                    .catch(function (error) {
                                        console.error('Error fetching lists:', error);
                                    });
                            }
                        })
                        .catch(function (error) {
                            console.error('Error retrieving board information:', error);
                        });
                } else {
                    // Return an empty array if the initialization has already been done
                    return [];
                }
            });
    },

    'show-settings': function (t, options) {
        // Use opfwsp to get board IDs and display them in the settings
        const boardIds = opfwsp.getBoardIds();
        const settings = boardIds.map((boardId, index) => ({
            name: `Board ${index + 1}`,
            value: boardId,
            context: 'board',
        }));

        return t.popup({
            title: 'Power-Up Settings',
            items: settings,
        });
    },
});

console.log("End Linguini");
