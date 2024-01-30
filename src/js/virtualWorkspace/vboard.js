// vboard.js
// Made by Yoann Raton, 29/01/2024

import VList from './vlist.js';
import VCard from './vcard.js';

class VBoard {
  constructor(Id, name, json, lists) {
    this.boardId = Id;
    this.boardName = name;
    this.boardJson = json;
    this.lists = lists || [];
  }

  getBoardId() {
    return this.boardId;
  }

  getBoardName() {
    return this.boardName;
  }

  getBoardJson() {
    return this.boardJson;
  }

  addList(list) {
    this.lists.push(list);
  }

  getLists() {
    return this.lists;
  }

  setLists(lists) {
    this.lists = lists.map(list => new List(list.Id, list.name, list.cards));
  }

  getCards() {
    const cards = [];
  
    for (const list of this.lists) {
      cards.push(...list.getCards());
    }
  
    return cards;
  }

  display() {
    console.log(`Board Id: ${this.boardId}`);
    console.log(`Board Name: ${this.boardName}`);
    console.log('Lists:');
    
    this.lists.forEach((list, index) => {
        console.log(`  ${index + 1}.`);
        list.displayListDetails();
    });
  }
}

export default VBoard;