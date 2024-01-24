// card.js
// Made by Yoann Raton, 19/01/2024

class Card {
  constructor(id, name, listId, listName, items) {
      this.cardId = id;
      this.cardTitle = name;
      this.listId = listId;
      this.listName = listName;
      this.items = items || []; // Initialize items as an empty array if not provided
  }

  // Method to add an item to the card
  addItem(item) {
      this.items.push(item);
  }

  // Method to get the items of the card
  getItems() {
      return this.items;
  }
}

export default Card;
