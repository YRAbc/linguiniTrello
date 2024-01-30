// vlist.js
// Made by Yoann Raton, 29/01/2024

import VCard from './vcard.js';

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

  setListJson(json) {
    this.listJson = json;
  }

  addCard(card) {
    this.listCards.push(card);
  }

  setCards(cards) {
      if (!Array.isArray(cards)) {
          throw new Error('Invalid parameter. Expected an array of cards.');
      }

      this.listCards = cards.map(card => new VCard(
          card.id,
          card.name,
          card.json,
          this.listId,
          this.listName,
      ));
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
