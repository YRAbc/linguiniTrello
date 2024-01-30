// vcard.js
// Made by Yoann Raton, 29/01/2024

import VLabel from './vlabel.js';
import IdsConfigWorkspace from '../idsWorkspace/idsConfigWorkspace.js';

class VCard {
    constructor(Id, name, json, listId, listName, items, description, opfTechNumber, statusId, priorityId, techId, issuerId) {

        //Config
        const config = new IdsConfigWorkspace();
        this.cardId = Id;
        this.cardName = name;
        this.cardJson = json;
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

    getCardId() {
        return this.cardId;
    }

    getCardName() {
        return this.cardName;
    }

    getCardJson() {
        return this.cardJson;
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
        return this.status.getLabelOption();
    }

    getPriority() {
        return this.priority.getLabelOption();
    }

    getTech() {
        return this.tech.getLabelOption();
    }

    getIssuer() {
        return this.issuer.getLabelOption();
    }

    setDescription(description) {
        this.description = description || '';
    }

    setOPFTechNumber(opfTechNumber) {
        this.opfTechNumber = opfTechNumber || '';
    }

    setStatusT(status) {
        this.status.setLabelOptionT(status);
    }

    setPriorit(priority) {
        this.priority.setLabelOptionT(priority);
    }

    setTech(tech) {
        this.tech.setLabelOptionT(tech);
    }

    setIssuer(issuer) {
        this.issuer.setLabelOptionT(issuer);
    }
}

export default VCard;