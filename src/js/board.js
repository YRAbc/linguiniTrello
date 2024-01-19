// board.js
// Made by Yoann Raton, 19/01/2024

class Board {
    
    constructor(id, name) {
      this.boardID = null;
      this.boardTitle = null;
      this.boardLists = [];
    }
  
    addCard(card) {
      this.cards.push(card);
  }

  removeCard(card) {
      const index = this.cards.indexOf(card);

      if (index !== -1) {
          this.cards.splice(index, 1);
      } else {
          console.warn("Card not found in the board.");
      }
  }

  getNumCards() {
      return this.cards.length;
  }
  
}