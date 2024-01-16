// board.js
// Made by Yoann Raton, 16/01/2024

import List from './list.js';

export default class Board {
  constructor(name) {
    this.name = name;
    this.lists = [];
  }

  addList(list) {
    this.lists.push(list);
  }

  // Other methods and properties specific to a board
}