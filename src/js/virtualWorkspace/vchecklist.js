// vchecklist.js
// Made by Yoann Raton, 09/02/2024

import VCheckListItem from './vchecklistitem.js';

class VCheckList {
    constructor(id, idBoard, idCard, name, checkListItems) {

        this.checkListId = id;
        this.checkListBoardId = idBoard;
        this.checkListCardId = idCard;
        this.checkListName = name;
        this.checkListItems = checkListItems || [];
    }
    
    getCheckListId() {
        return this.checkListId;
    }

    getCheckListBoardId() {
        return this.checkListBoardId;
    }

    getCheckListCardId() {
        return this.checkListCardId;
    }

    getCheckListName() {
        return this.checkListName;
    }

    getCheckListItems() {
        return this.checkListItems;
    }

    addItem(item) {
        this.checkListItems.push(item);
    }
    
    setItems(items) {
        if (!Array.isArray(items)) {
            throw new Error('Invalid parameter. Expected an array of items.');
        }
    
        this.checkListItems = items.map(item => {
            // Assuming each item in the 'items' array has attributes id, idCheckList, name, pos, state, due, dueReminder, idMember, idChecklist
            return new VCheckListItem(
                item.id,
                item.idCheckList,
                item.name,
                item.pos,
                item.state,
                item.due,
                item.dueReminder,
                item.idMember,
                item.idChecklist
            );
        });
    }    
    
    display() {
        console.log(`Checklist Id: ${this.checkListId}`);
        console.log(`Checklist Name: ${this.checkListName}`);
        console.log('Items:');
        this.checkListItems.forEach((item, index) => {
            console.log(`  - Item ${index + 1}: ${item.getItemName()}, Completed: ${item.isCompleted()}`);
        });
    }

}