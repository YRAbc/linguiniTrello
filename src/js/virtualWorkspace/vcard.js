// vcard.js
// Made by Yoann Raton, 29/01/2024

import VLabel from './vlabel.js';

class VCard {
    constructor(id, name, listId, listName, items, description, opfTechNumber, statusId, priorityId, techId, issuerId) {

        //Config
        const config = new IdsConfiWorkspace();
        this.cardId = id;
        this.cardName = name;
        this.listId = listId;
        this.listName = listName;
        this.items = items || [];
        this.description = description || '';
        this.opfTechNumber = opfTechNumber || '';
        this.status = new VLabel(statusId, "Status");
        this.priority = new VLabel(priorityId, "Priority");
        this.tech = new VLabel(techId, "Tech");
        this.issuer = new VLabel(issuerId, "Issuer");
    }

    addItem(item) {
        this.items.push(item);
    }

    getCardID() {
        return this.cardId;
    }

    getCardName() {
        return this.cardName;
    }

    getItems() {
        return this.items;
    }

    getDescription() {
        return this.description;
    }

    getOPFTechNumber() {
        return this.opfTechNumber;
    }

    getStatus() {
        return this.status;
    }

    getPriority() {
        return this.priority;
    }

    getTech() {
        return this.tech;
    }

    getIssuer() {
        return this.issuer;
    }

    setDescription(description) {
        this.description = description || '';
    }

    setOPFTechNumber(opfTechNumber) {
        this.opfTechNumber = opfTechNumber || '';
    }

    setStatus(status) {
        this.status = status || '';
    }

    setPriority(priority) {
        this.priority = priority || '';
    }

    setTech(tech) {
        this.tech = tech || '';
    }

    setIssuer(issuer) {
        this.issuer = issuer || '';
    }
}

export default VCard;