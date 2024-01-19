// list.js
// Made by Yoann Raton, 19/01/2024

class List {
  constructor(apiKey, token, boardId) {
    this.trello = new Trello(apiKey, token);
    this.boardId = boardId;
    this.listId = null;
    this.listName = null;
    this.listCards = [];
  }

  async createList(listName) {
    try {
      const newList = await this.trello.addList(listName, this.boardId);
      this.listId = newList.id;
      this.listName = newList.name;
      console.log(`List '${listName}' created with ID: ${this.listId}`);
    } catch (error) {
      console.error(`Error creating list: ${error}`);
    }
  }

  async getListId() {
    return this.listId;
  }

  async getListName() {
    return this.listName;
  }

  async addCard(cardName) {
    if (!this.listId) {
      console.error('List not created yet. Call createList() first.');
      return;
    }

    try {
      const newCard = await this.trello.addCard(cardName, '', this.listId);
      this.listCards.push({ id: newCard.id, name: newCard.name });
      console.log(`Card '${cardName}' created with ID: ${newCard.id}`);
    } catch (error) {
      console.error(`Error creating card: ${error}`);
    }
  }

  async removeCard(cardId) {
    if (!this.listId) {
      console.error('List not created yet. Call createList() first.');
      return;
    }

    try {
      await this.trello.deleteCard(cardId);
      this.listCards = this.listCards.filter((card) => card.id !== cardId);
      console.log(`Card with ID ${cardId} removed.`);
    } catch (error) {
      console.error(`Error removing card: ${error}`);
    }
  }

  displayListDetails() {
    console.log(`List ID: ${this.listId}`);
    console.log(`List Name: ${this.listName}`);
    console.log('Cards:');
    this.listCards.forEach((card) => {
      console.log(`  - Card ID: ${card.id}, Card Name: ${card.name}`);
    });
  }
}
