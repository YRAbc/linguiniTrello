// vchecklistitem.js
// Made by Yoann Raton, 09/02/2024

class VCheckListItem {

    constructor(id, idCheckList, name, pos, state, due, dueReminder, idMember, idChecklist) {

        this.id = id;
        this.idCheckList = idCheckList;
        this.name = name;
        this.pos = pos;
        this.state = state;
        this.due = due;
        this.dueReminder = dueReminder;
        this.idMember = idMember;
        this.idChecklist = idChecklist;
    }

    getId() {
        return this.id;
    }

    getIdCheckList() {
        return this.idCheckList;
    }

    getName() {
        return this.name;
    }

    getPos() {
        return this.pos;
    }

    getState() {
        return this.state;
    }

    getDue() {
        return this.due;
    }

    getDueReminder() {
        return this.dueReminder;
    }

    getIdMember() {
        return this.idMember;
    }

    getIdChecklist() {
        return this.idChecklist;
    }
}
