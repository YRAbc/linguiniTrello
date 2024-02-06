// vlabel.js
// Made by Yoann Raton, 29/01/2024

class VLabel {
    constructor(name) {
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

    getLabelName() {
        return this.labelName;
    }

    getLabelOption() {
        return this.labelOptions[this.labelOption];
    }

    getLabelOptions() {
        return this.labelOptions;
    }

    setLabelOption(option) {
        this.labelOption = option;
    }

    setLabelOptionT(optionText) {
        const index = this.labelOptions.findIndex(option => option === optionText);
    
        if (index !== -1) {
            this.labelOption = index;
            console.log(`Label option set to index: ${index}`);
        } else {
            //console.warn(`Label option "${optionText}" not found in labelOptions.`);
        }
    }

    // Method to display label data
    display() {
        console.log(`Label Name: ${this.getLabelName()}`);
        console.log("Label Options:");
        this.getLabelOptions().forEach((option, index) => {
            console.log(`  ${index + 1}. ${option}`);
        });
    }
}

export default VLabel;
  