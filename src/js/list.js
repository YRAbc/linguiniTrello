// list.js
// Made by Yoann Raton, 19/01/2024

import Card from './card.js';

class List {
  constructor(id, name, cards) {
    this.listId = id;
    this.listName = name;
    this.listCards = cards || [];
  }

  getListId() {
    return this.listId;
  }

  getListName() {
    return this.listName;
  }

  getListCards() {
    return this.listCards;
  }

  // Method to add a card to the list
  addCard(cardId, cardName, items) {
      const card = new Card(cardId, cardName, this.listId, this.listName, items);
      this.listCards.push(card);
  }

  displayListDetails() {
    console.log(`List ID: ${this.listId}`);
    console.log(`List Name: ${this.listName}`);
    console.log('Cards:');
    this.listCards.forEach((card) => {
      console.log(`  - Card ID: ${card.cardId}, Card Name: ${card.cardTitle}`);
    });
  }
}

export default List;
