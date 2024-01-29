// vlist.js
// Made by Yoann Raton, 29/01/2024

import Card from './vcard.js';

class VList {
  constructor(id, name, cards) {
    this.listId = id;
    this.listName = name;
    this.listCards = cards || [];
  }

  getListID() {
    return this.listId;
  }

  getListName() {
    return this.listName;
  }

  addCard(card) {
    this.listCards.push(card);
  }

  setCards(cards) {
    this.listCards = cards.map(cards => new Card(cardId, cardName, this.listId, this.listName, items));
  }

  getCards() {
    return this.listCards;
  }

  display() {
    console.log(`List ID: ${this.listId}`);
    console.log(`List Name: ${this.listName}`);
    console.log('Cards:');
    this.listCards.forEach((card) => {
      console.log(`  - Card ID: ${card.cardId}, Card Name: ${card.cardTitle}`);
    });
  }
}

export default VList;
