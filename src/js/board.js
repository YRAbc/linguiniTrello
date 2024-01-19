// board.js
// Made by Yoann Raton, 19/01/2024

class Board {
    
  constructor(id, name) {
    this.boardID = id;
    this.boardName = name;
    this.boardLists = [];
  }
  
  getBoardID() {
    return this.boardID;
  }

  getBoardName() {
    return this.boardName;
  }

}