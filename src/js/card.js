// card.js
// Made by Yoann Raton, 19/01/2024

class Card {
    constructor(id, name, listId, listName, items) {
        this.cardId = id;
        this.cardTitle = name;
        this.listId = listId;
        this.listName = listName;
        this.items = items;
    }
  
    addItem(item) {
        this.items.push(item);
    }
    
    getCardID() {
        return this.cardId;
    }
  
    getCardName() {
        return this.cardTitle;
    }

    getItems() {
        return this.items;
    }
  }
  
  export default Card;
  