// board.js
// Made by Yoann Raton, 19/01/2024

import List from './list.js';

class Board {
  constructor(id, name) {
    this.boardID = id;
    this.boardName = name;
    this.lists = [];
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

  addList(list) {
    this.lists.push(list);
  }

  setLists(lists) {
    this.lists = lists.map(list => new List(list.id, list.name, list.cards));
  }

  displayLists() {
    console.log(`Board ID: ${this.boardID}`);
    console.log(`Board Name: ${this.boardName}`);
    console.log('Lists:');
    
    this.lists.forEach((list, index) => {
      console.log(`  ${index + 1}. List ID: ${list.getListId()}, List Name: ${list.getListName()}`);
      list.getListCards().forEach((card, cardIndex) => {
        console.log(`    - Card ${cardIndex + 1}: Card ID: ${card.id}, Card Name: ${card.name}`);
      });
    });
  }
}

export default Board;