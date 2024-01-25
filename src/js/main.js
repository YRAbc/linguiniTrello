// main.js
// Made by Yoann Raton, 16/01/2024

// Import the Items class
import Workspace from './workspace.js';
import Board from './board.js';
import List from './list.js';
import Card from './card.js';
import Ruler from './ruler.js';
import Updater from './updater.js';

import oAuth from './authSettings.js';
import Post from './post.js';
import Get from './get.js';


// Start info
console.log("Start Linguini For Trello *");

// Call to have access to post and get
const oauth = new oAuth();
const poster = new Post(oauth);
const getter = new Get(oauth);

// create workspace and ruler for it
const opfwsp = new Workspace("OpfTechWorkspace");
const ruler = new Ruler(opfwsp, getter, poster);

// update is made to see difference between current and opfwsp
const updater = new Updater(opfwsp, ruler, getter, poster);

// Counter to track the number of registered boards
let registeredBoardsCount = 0;

// Initialize Trello Power-Up
window.TrelloPowerUp.initialize({

    'board-buttons': function (t, options) {
        return [
            {
                text: 'Add',
                callback: function (t) {
                    // Retrieve the board ID
                    let boardId = t.getContext().board;

                    // Retrieve the board name using Trello API
                    //console.log("Update Linguini");
                    t.board('name')
                        .then(function (board) {
                            const id = boardId;
                            const nam = board.name;

                            if (id && nam) {

                                // For each Trello list, create a new List object and add it to the board
                                t.lists('all')
                                .then(function (lists) {
                                    const listObjects = lists.map((list) => {
                                        // Create a new List object for each Trello list
                                        const listObj = new List(list.id, list.name || 'Unknown List');

                                        // Log information about the current list
                                        //console.log(`List ID: ${list.id}`);
                                        //console.log(`List Name: ${list.name || 'Unknown List'}`);

                                        // For each card in the Trello list, create a Card object and add it to the list
                                        list.cards.forEach((card) => {
                                            // Extract items from Trello card if available
                                            const items = card.items || [];

                                            // Create a Card object for each Trello card
                                            const cardObj = new Card(card.id, card.name, listObj.id, listObj.name || 'Unknown List', items);

                                            // Log information about the current card
                                            //console.log(`  Card ID: ${card.id}`);
                                            //console.log(`  Card Name: ${card.name}`);
                                            //console.log(`  Card Items: ${JSON.stringify(items)}`);

                                            // Add the card object to the list object
                                            listObj.addCard(cardObj);
                                        });

                                        // Return the new List object
                                        return listObj;
                                    });

                                    const boardObj = new Board(id, nam, listObjects);
                                    opfwsp.addBoard(boardObj);
                                    //console.log('Board added to workspace.');

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
                    opfwsp.printBoards();
    
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


function setupPeriodicUpdates() {
    // Set up periodic updates only if there are exactly three boards
    if (opfwsp.getBoards().length === 3) {
        // Create an instance of oAuth and Get
        const oauth = new oAuth();
        const getter = new Get(oauth);

        setInterval(async () => {
            try {
                // Check for modifications
                await updater.checkForModifications();
            } catch (error) {
                console.error('Error during periodic update:', error);
            }
        }, 10000); // Update every 10 seconds
    } else {
        //console.log('Updater not started - There must be exactly three boards in the workspace.');
    }
}

