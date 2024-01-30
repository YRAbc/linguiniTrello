// vlist.js
// Made by Yoann Raton, 29/01/2024

import Card from './vcard.js';

class VList {
  constructor(Id, name, json, cards) {
    this.listId = Id;
    this.listName = name;
    this.listJson = json;
    this.listCards = cards || [];
  }

  getListId() {
    return this.listId;
  }

  getListName() {
    return this.listName;
  }

  getListJson() {
    return this.listJson;
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
    console.log(`List Id: ${this.listId}`);
    console.log(`List Name: ${this.listName}`);
    console.log('Cards:');
    this.listCards.forEach((card) => {
      console.log(`  - Card Id: ${card.cardId}, Card Name: ${card.cardTitle}`);
    });
  }
}

export default VList;
