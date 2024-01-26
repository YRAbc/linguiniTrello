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
updater.updateWorkspace();
setupPeriodicUpdates();

//OPFTech-Number for cards
let opfTechCardNumber = 1;

// Initialize Trello Power-Up
window.TrelloPowerUp.initialize({
  
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
  
          if (error.response && error.response.status === 429) {
            // Rate limiting error
            const retryAfter = error.response.headers['retry-after'] || 10; // Default to 10 seconds
            console.log(`Rate limiting error. Retrying after ${retryAfter} seconds.`);
            await sleep(retryAfter * 1000); // Convert seconds to milliseconds
          }
        }
      }, 10000); // Update every 10 seconds
    } else {
      // console.log('Updater not started - There must be exactly three boards in the workspace.');
    }
}
  
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

