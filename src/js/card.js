// card.js
// Made by Yoann Raton, 19/01/2024

class Card {
    constructor(id, name, listId, listName, items, description, opfTechNumber, status, priority, tech, issuer) {
        this.cardId = id;
        this.cardTitle = name;
        this.listId = listId;
        this.listName = listName;
        this.items = items || [];
        this.description = description || '';
        this.opfTechNumber = opfTechNumber || '';
        this.status = status || '';
        this.priority = priority || '';
        this.tech = tech || '';
        this.issuer = issuer || '';
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

export default Card;


  /* Cards

for opf tech a card should have

  an id
  a name/title
  a description

  an #OPFTech-Number based on the creation of the card

  4 labels
    Status :
        Open
        In Progress
        Testing
        Pending Delivery
        Delivered
        Validated
        Waiting
        Blocked
        Cancelled

    Priority :
        Blocker
        Critic
        Major
        Minor
        To Qualify

    Tech :
        OPF Tech Support
        OPF Tech Project
        SID
        Not A Tech Card
        To Qualify

    Issuer :
        PBTeam
        Support Trading
        Treasury
        Valudationn
        Access Market
        OPF Tech
        Manager
        To Qualify

    
  */
  