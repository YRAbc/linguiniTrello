// main.js
// Made by Yoann Raton, 19/01/2024

class Workspace {
    constructor(name) {
        this.name = name;
        this.boards = [];
        this.totalCards = 0;
    }

    addBoard(board) {
        this.boards.push(board);
        this.totalCards += board.getNumCards();
    }

    getTotalCards() {
        return this.totalCards;
    }

    getBoards() {
        return this.boards;
    }
}