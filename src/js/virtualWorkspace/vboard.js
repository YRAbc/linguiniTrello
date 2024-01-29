// vboard.js
// Made by Yoann Raton, 29/01/2024

import VList from './vlist.js';
import VCard from './vcard.js';

class VBoard {
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

  addList(list) {
    this.lists.push(list);
  }

  getLists() {
    return this.lists;
  }

  setLists(lists) {
    this.lists = lists.map(list => new List(list.id, list.name, list.cards));
  }

  getCards() {
    const cards = [];
  
    for (const list of this.lists) {
      cards.push(...list.getCards());
    }
  
    return cards;
  }

  display() {
    console.log(`Board ID: ${this.boardID}`);
    console.log(`Board Name: ${this.boardName}`);
    console.log('Lists:');
    
    this.lists.forEach((list, index) => {
        console.log(`  ${index + 1}.`);
        list.displayListDetails();
    });
  }
}

export default VBoard;