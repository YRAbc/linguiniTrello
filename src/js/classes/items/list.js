// list.js
// Made by Yoann Raton, 16/01/2024

import Card from './card.js';

export default class List {
  constructor(name) {
    this.name = name;
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  // Other methods and properties specific to a list
}