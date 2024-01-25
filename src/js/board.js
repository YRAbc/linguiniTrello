// board.js
// Made by Yoann Raton, 19/01/2024

import List from './list.js';
import Card from './card.js';

class Board {
  constructor(id, name, lists) {
    this.boardID = id;
    this.boardName = name;
    this.lists = lists || [];
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

  getCards() {
    const cards = [];
  
    for (const list of this.lists) {
      cards.push(...list.getCards());
    }
  
    return cards;
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
        console.log(`  ${index + 1}.`);
        list.displayListDetails();
    });
  }
}

export default Board;