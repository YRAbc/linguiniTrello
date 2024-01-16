// connector.js
// Made by Yoann Raton, 16/01/2024

export default class Connector {

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
  
          // Add your key, auth, and secret
          const key = 'fa9aab0039cce75efc142efc7e65a403';
          const auth = '';
          const secret = 'a54e7f3488ca0a442879d97a77b27993e7d6d36';
  
          // Use key, auth, and secret as needed
          this.useKeyAuthSecret(key, auth, secret);
        })
        .catch((error) => {
          console.error('Error fetching board information:', error);
        });
    }
  
    // Add other methods and properties as needed
  
    // Example method using key, auth, and secret
    useKeyAuthSecret(key, auth, secret) {
      // Use key, auth, and secret for Trello API requests or other actions
      console.log('Using key:', key);
      console.log('Using auth:', auth);
      console.log('Using secret:', secret);
  
      // Example: Make a Trello API request with key and auth
      t.get('/members/me', { key, token: auth })
        .then((member) => {
          console.log('Member info:', member);
          // Perform additional actions based on member info
        })
        .catch((error) => {
          console.error('Error fetching member information:', error);
        });
    }
  }
  