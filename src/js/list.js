// list.js
// Made by Yoann Raton, 19/01/2024

class List {
  constructor(id, name, cards = []) {
    this.listId = id;
    this.listName = name;
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

  displayListDetails() {
    console.log(`List ID: ${this.listId}`);
    console.log(`List Name: ${this.listName}`);
    console.log('Cards:');
    this.listCards.forEach((card) => {
        console.log(`  - Card ID: ${card.cardId}`);
        console.log(`    Card Name: ${card.cardTitle}`);
        console.log(`    List ID: ${card.listId}`);
        console.log(`    List Name: ${card.listName}`);
    });
  }
}

export default List;