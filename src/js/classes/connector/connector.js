// connector.js
// Made by Yoann Raton, 16/01/2024

// Import the Card class
import Card from '././items/card.js';

export default class Connector {
  constructor() {
    this.boards = []; // Array to store information about boards
  }

  // This method is called when the Power-Up is initialized
  onPowerUpInit(t, options) {
    // Retrieve information about the workspace
    const workspaceId = t.getContext().workspace;
    console.log("Workspace ID:", workspaceId);

    // Retrieve information about boards
    t.lists('all')
      .then((lists) => {
        lists.forEach((list) => {
          // Assuming each list corresponds to a board
          const board = {
            id: list.idBoard,
            name: list.name,
          };
          this.boards.push(board);
        });

        // Log information about boards
        console.log("Boards:", this.boards);
      })
      .catch((error) => {
        console.error('Error fetching board information:', error);
      });
  }

  // Add other methods and properties as needed
}
