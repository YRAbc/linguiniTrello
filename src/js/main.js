// Import Workspace Manager
import WorkspaceManager from './workspaceManager.js';

// Start info
console.log("Start Linguini For Trello Power Up");

// Initialize Workspace Manager
const workspaceManager = new WorkspaceManager();

// Initialize Trello Power-Up
window.TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      text: 'Update',
      callback: async function(t){
        try {
          // Check for modifications
          await workspaceManager.checkForModifications();
          t.alert({
            message: 'Workspace updated successfully!',
            duration: 5,
            display: 'info'
          });
        } catch (error) {
          console.error('Error updating workspace:', error);

          // Show error message
          t.alert({
            message: 'Error updating workspace. Please try again later.',
            duration: 5,
            display: 'error'
          });
        }
      }
    }];
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
