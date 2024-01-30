// vcard.js
// Made by Yoann Raton, 29/01/2024

import VLabel from './vlabel.js';
import IdsConfigWorkspace from '../idsWorkspace/idsConfigWorkspace.js';

class VCard {
    constructor(Id, name, json, listId, listName, opfTechNumber) {

        //Config
        const config = new IdsConfigWorkspace();
        this.cardId = Id;
        this.cardName = name;
        this.cardJson = json;
        this.listId = listId;
        this.listName = listName;
        this.opfTechNumber = opfTechNumber || '';
        this.status = new VLabel(statusId, "Status");
        this.priority = new VLabel(priorityId, "Priority");
        this.tech = new VLabel(techId, "Tech");
        this.issuer = new VLabel(issuerId, "Issuer");
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

    setOPFTechNumber(opfTechNumber) {
        this.opfTechNumber = opfTechNumber || '';
    }

    setCardJson(json)
    {
        this.cardJson = json;
    }

    setStatusT(status) {
        this.status.setLabelOptionT(status);
    }

    setPriorityT(priority) {
        this.priority.setLabelOptionT(priority);
    }

    setTechT(tech) {
        this.tech.setLabelOptionT(tech);
    }

    setIssuerT(issuer) {
        this.issuer.setLabelOptionT(issuer);
    }
}

export default VCard;