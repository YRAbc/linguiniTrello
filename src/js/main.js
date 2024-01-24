// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Items class
import Workspace from './workspace.js';
import Board from './board.js';
import List from './list.js';
import Card from './card.js';
import Ruler from './ruler.js';
import Updater from './updater.js';

// Start info
console.log("Start Linguini");

const opfwsp = new Workspace("OpfTechWorkspace");
const ruler = new Ruler(opfwsp);
const updater = new Updater(opfwsp, ruler);

// Counter to track the number of registered boards
let registeredBoardsCount = 0;

// Function to set up periodic updates
function setupPeriodicUpdates() {
    // Set up periodic updates only if there are exactly three boards
    if (registeredBoardsCount === 3) {
        setInterval(() => {
            updater.checkForModifications();
        }, 1000); // Update every 1 second
    } else {
        console.log('Updater not started - There must be exactly three boards in the workspace.');
    }
}

// Initialize Trello Power-Up
window.TrelloPowerUp.initialize({

    'board-buttons': function (t, options) {
        return [
            {
                // Remove the 'initPowerUp' flag check
                text: 'Add',
                callback: function (t) {
                    // Retrieve the board ID
                    let boardId = t.getContext().board;

                    // Retrieve the board name using Trello API
                    console.log("Update Linguini");
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

                                        console.log('Board added to workspace.');

                                        // Call the function to set up periodic updates after registering the third board
                                        registeredBoardsCount += 1;
                                        setupPeriodicUpdates();
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

                    // Remove the board from the workspace using removeBoardById
                    opfwsp.removeBoardById(boardId);
                    
                    console.log('Board removed from workspace:', boardId);
                },
            },
            {
                text: 'See Workspace Settings',
                callback: function (t) {
                    // Access opfwsp and retrieve board IDs and names
                    const boardsInfo = opfwsp.getBoardsInfo();
    
                    // Format the board information for display
                    const displayInfo = boardsInfo.map((board, index) => {
                        return `Board ${index + 1}: ID - ${board.id}, Name - ${board.name}`;
                    });
    
                    // Show a popup or log the board information
                    window.alert(`Board IDs and Names in OpfTechWorkspace:\n${displayInfo.join('\n')}`);
                },
            },
        ];
    },
  
    'show-settings': function (t, options) {
      // Use opfwsp to get board IDs and names and display them in the settings
      const boardsInfo = opfwsp.getBoardsInfo();
      const settings = boardsInfo.map((board, index) => ({
        name: `Board ${index + 1}`,
        value: board.id,
        context: 'board',
      }));
  
      return t.popup({
        title: 'Power-Up Settings',
        items: settings,
      });
    },
  });

console.log("End Linguini");
