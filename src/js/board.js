// board.js
// Made by Yoann Raton, 19/01/2024

class Board {
    
    constructor(apiKey, token) {
      this.trello = new Trello(apiKey, token);
      this.boardID = null;
      this.boardTitle = null;
      this.boardLists = [];
    }
  
    async createBoard(boardName) {
      try {
        const newBoard = await this.trello.addBoard(boardName);
        this.boardID = newBoard.id;
        this.boardTitle = newBoard.name;
        console.log(`Board '${boardName}' created with ID: ${this.boardID}`);
      } catch (error) {
        console.error(`Error creating board: ${error}`);
      }
    }
  
    async getBoardID() {
      return this.boardID;
    }
  
    async getBoardTitle() {
      return this.boardTitle;
    }
  
    async addList(listName) {
      if (!this.boardID) {
        console.error('Board not created yet. Call createBoard() first.');
        return;
      }
  
      try {
        const newList = await this.trello.addList(listName, this.boardID);
        this.boardLists.push({ id: newList.id, name: newList.name });
        console.log(`List '${listName}' created with ID: ${newList.id}`);
      } catch (error) {
        console.error(`Error creating list: ${error}`);
      }
    }
  
    async removeList(listId) {
      if (!this.boardID) {
        console.error('Board not created yet. Call createBoard() first.');
        return;
      }
  
      try {
        await this.trello.deleteList(listId);
        this.boardLists = this.boardLists.filter((list) => list.id !== listId);
        console.log(`List with ID ${listId} removed.`);
      } catch (error) {
        console.error(`Error removing list: ${error}`);
      }
    }
  
    displayBoardDetails() {
      console.log(`Board ID: ${this.boardID}`);
      console.log(`Board Title: ${this.boardTitle}`);
      console.log('Lists:');
      this.boardLists.forEach((list) => {
        console.log(`  - List ID: ${list.id}, List Name: ${list.name}`);
      });
    }
  }