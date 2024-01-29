// vlabel.js
// Made by Yoann Raton, 29/01/2024

class VLabel {
    constructor(Id, name) {
        this.labelId = Id;
        this.labelName = name;
        this.labelOption = 0;
        
        if (name === "Status") {
            this.labelOptions = [
                "Open",
                "In Progress",
                "Testing",
                "Pending Delivery",
                "Delivered",
                "Validated",
                "Waiting",
                "Blocked",
                "Cancelled"
            ];
        } else if (name === "Priority") {
            this.labelOptions = [
                "Blocker",
                "Critical",
                "Major",
                "Minor",
                "To Qualify"
            ];
        } else if (name === "Tech") {
            this.labelOptions = [
                "OPF Tech Support",
                "OPF Tech Project",
                "SID",
                "Not A Tech Card",
                "To Qualify"
            ];
        } else if (name === "Issuer") {
            this.labelOptions = [
                "PBTeam",
                "Support Trading",
                "Treasury",
                "Validation",
                "Access Market",
                "OPF Tech",
                "Manager",
                "To Qualify"
            ];
        } else {
            // Handle the case when name doesn't match any of the predefined options
            console.log("Invalid name:", name);
        }
        
    }

    getLabelId() {
        return this.labelId;
      }
    
    getLabelName() {
        return this.labelName;
    }

    setLabelOption(option) {
        return this.labelOption = option;
    }

    getLabelOption() {
        return this.labelOptions[option];
    }

    getLabelOptions() {
        return this.labelOptions;
    }

    // Method to display label data
    display() {
        console.log(`Label Id: ${this.getLabelId()}`);
        console.log(`Label Name: ${this.getLabelName()}`);
        console.log("Label Options:");
        this.getLabelOptions().forEach((option, index) => {
            console.log(`  ${index + 1}. ${option}`);
        });
    }
}

export default VLabel;
  