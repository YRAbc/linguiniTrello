// board.js
// Made by Yoann Raton, 19/01/2024

import List from './list.js';

class Board {
    
  constructor(id, name) {

    this.boardID = id;
    this.boardName = name;
    this.lists = []
  }
  
  getBoardID() {
    return this.boardID;
  }

  getBoardName() {
    return this.boardName;
  }

  getLists() {
    return this.lists;
  }

  addLists() {


  }

}

export default Board;