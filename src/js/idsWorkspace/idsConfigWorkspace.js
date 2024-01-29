// idsConfigWorkspace.js
// Made by Yoann Raton, 26/01/2024

class IdsConfigWorkspace {
    /*constructor() {

         OPF ToDo Liss 
        this.opfBoardId = "65a5339acc54164519f0561a";
        this.opfBoardTechListId = "65a5339acc54164519f05621";
        this.opfBoardDoingListId = "65a5339acc54164519f05622";
        this.opfBoardValidatedListId = "65a5339acc54164519f05623";

        this.opfBoardCustPriorityId = "65b3cb5da8d2096df151f434";
        this.opfBoardCustPriorityBlockerId = "65b3eb27e874cfeb8a989611";
        this.opfBoardCustPriorityCriticId = "65b3eb2ad53c682f0b88be7b";
        this.opfBoardCustPriorityMajorId = "65b3eb2dd2ba685e6347f1c1";
        this.opfBoardCustPriorityMinorId = "65b3eb2fff37339c2bda47fd";
        this.opfBoardCustPriorityToQualifyId = "65b3eb34c91e150132d34f69";

        this.opfBoardCustIssuerId = "65b3cb72ed6e154782321735";
        this.opfBoardCustIssuerPBTeamId = "65b3eb52978d1418ec00488f";
        this.opfBoardCustIssuerSupportTradingId = "65b3eb56fd2d9cd2b6c0b38b";
        this.opfBoardCustIssuerTreasuryId = "65b3eb580209c9211e5362f3";
        this.opfBoardCustIssuerValuationId = "65b3eb5b685aeb9c76816193";
        this.opfBoardCustIssuerAccessMarketId = "65b3eb63bfd3a0285d98b0d7";  
        this.opfBoardCustIssuerManagerId = "65b3eb65c25fdade1a7079a3";  
        this.opfBoardCustIssuerToQualifyId = "65b3eb693f12c7d370d50519";

        this.opfBoardCustTechId = "65b3cb86318d868a181a0389";
        this.opfBoardCustTechSupportId = "65b3eb73c4b19cd9d7cbeedd";
        this.opfBoardCustTechProjectId = "65b3eb76d5263fe4bded546d";
        this.opfBoardCustTechSIDId = "65b3eb78ed1de610156e70a6";
        this.opfBoardCustTechNotTechId = "65b3eb7d2cacb867749e3d8c";
        this.opfBoardCustTechToQualifyId = "65b3eb836ba9fb08d1213d61";  

        this.opfBoardCustStatusId = "65b3d5edaf660f2f5bdd1b53";
        this.opfBoardCustStatusOpenId = "65b3eb90979e87894398354a";
        this.opfBoardCustStatusInProgressId = "65b3eb94c49cc36325a1c3b7";
        this.opfBoardCustStatusTestingId = "65b3eb975573907f52c734e0";
        this.opfBoardCustStatusPendingDeliveryId = "65b3eb9a6f590846d9787c0c";
        this.opfBoardCustStatusDeliveredId = "65b3eb9d548e8f99ce5ed7dc";  
        this.opfBoardCustStatusValidatedId = "65b3eb9f351c3e5fcbe7fed3";  
        this.opfBoardCustStatusWaitingId = "65b3eba235d407092e70d969";
        this.opfBoardCustStatusBlockedId = "65b3eba480870508200a2519";      
        this.opfBoardCustStatusCancelledId = "65b3eba84ea65cbbdaff2663";

         SID 
        this.sidBoardId = "65a906575cbb2953f63286e9";
        this.sidBoardTechListId = "65a9065c99f90b6028928dcc";

        this.sidBoardCustPriorityId = "65b3ebb4c8c7e797dc0cca9b";
        this.sidBoardCustPriorityBlockerId = "65b3ebc10b7b671945487b10";
        this.sidBoardCustPriorityCriticId = "65b3ebc3faccc97b451837f0";
        this.sidBoardCustPriorityMajorId = "65b3ebc5cdc5cfd03bf37834";
        this.sidBoardCustPriorityMinorId = "65b3ebc69ac2ef30d37f03c8";
        this.sidBoardCustPriorityToQualifyId = "65b3ebc9b8a9674a41c2beb6";

        this.sidBoardCustIssuerId = "65b3ec344cf4eb491d28aa38";
        this.sidBoardCustIssuerPBTeamId = "65b3ec344cf4eb491d28aa39";
        this.sidBoardCustIssuerSupportTradingId = "65b3ec344cf4eb491d28aa3a";
        this.sidBoardCustIssuerTreasuryId = "65b3ec344cf4eb491d28aa3b";
        this.sidBoardCustIssuerValuationId = "65b3ec344cf4eb491d28aa3c";
        this.sidBoardCustIssuerAccessMarketId = "65b3ec344cf4eb491d28aa3d";  
        this.sidBoardCustIssuerManagerId = "65b3ec344cf4eb491d28aa3e";  
        this.sidBoardCustIssuerToQualifyId = "65b3ec344cf4eb491d28aa3f";

        this.sidBoardCustTechId = "65b3ebceb36afe762e5d97ef";
        this.sidBoardCustTechSupportId = "65b3ebdc811c1e4f2642d0da";
        this.sidBoardCustTechProjectId = "65b3ebdf713d646270df703d";
        this.sidBoardCustTechSIDId = "65b3ebe1f56b2c9ca3d759ce";
        this.sidBoardCustTechNotTechId = "65b3ebe5f674c3d052e34162";
        this.sidBoardCustTechToQualifyId = "65b3ebea626f0fa11ea0452d";  

        this.sidBoardCustStatusId = "65b3ec5ce67095f36b4def1e";
        this.sidBoardCustStatusOpenId = "65b3ec5ce67095f36b4def1f";
        this.sidBoardCustStatusInProgressId = "65b3ec5ce67095f36b4def20";
        this.sidBoardCustStatusTestingId = "65b3ec5ce67095f36b4def21";
        this.sidBoardCustStatusPendingDeliveryId = "65b3ec5ce67095f36b4def22";
        this.sidBoardCustStatusDeliveredId = "65b3ec5ce67095f36b4def23";  
        this.sidBoardCustStatusValidatedId = "65b3ec5ce67095f36b4def24";  
        this.sidBoardCustStatusWaitingId = "65b3ec5ce67095f36b4def25";
        this.sidBoardCustStatusBlockedId = "65b3ec5ce67095f36b4def26";      
        this.sidBoardCustStatusCancelledId = "65b3ec5ce67095f36b4def27";

         OPF TECH TASK BOARD 
        this.techBoardId = "65a533acf8bdb823367134d5";
        this.techBoardToClassifyListId = "65a533acf8bdb823367134dc";
        this.techBoardProjectListId = "65a533acf8bdb823367134dd";
        this.techBoardSupportListId = "65a533acf8bdb823367134de";
        this.techBoardSIDListId = "65a533e0203b31e91571133e";
        this.techBoardInProgressListId = "65a533ee14a4b7651e1023b9";
        this.techBoardInReviewListId = "65a533f15ffba80f03ae8ac1";
        this.techBoardPendingDeliveryListId = "65a533f5e072331593b68e87";
        this.techBoardDoneListId = "65a533f5e072331593b68e87";
        this.techBoardValidatedListId = "65a533f93359e67ebba68abb";

        this.techBoardCustPriorityId = "65b3ebb4c8c7e797dc0cca9b";
        this.techBoardCustPriorityBlockerId = "65b3ebc10b7b671945487b10";
        this.techBoardCustPriorityCriticId = "65b3ebc3faccc97b451837f0";
        this.techBoardCustPriorityMajorId = "65b3ebc5cdc5cfd03bf37834";
        this.techBoardCustPriorityMinorId = "65b3ebc69ac2ef30d37f03c8";
        this.techBoardCustPriorityToQualifyId = "65b3ebc9b8a9674a41c2beb6";

        this.techBoardCustIssuerId = "65a954eb3b1d7548e7d9cb21";
        this.techBoardCustIssuerPBTeamId = "65b3ec9076d9ac4c4dbdd7f6";
        this.techBoardCustIssuerSupportTradingId = "65a954eb3b1d7548e7d9cb24";
        this.techBoardCustIssuerTreasuryId = "65a954eb3b1d7548e7d9cb25";
        this.techBoardCustIssuerValuationId = "65a954eb3b1d7548e7d9cb26";
        this.techBoardCustIssuerAccessMarketId = "65a954eb3b1d7548e7d9cb27";  
        this.techBoardCustIssuerManagerId = "65a954eb3b1d7548e7d9cb28";  
        this.techBoardCustIssuerToQualifyId = "65af9cf98d4f759ce85d2a5f";

        this.techBoardCustTechId = "65a954eb3b1d7548e7d9cb32";
        this.techBoardCustTechSupportId = "65a954eb3b1d7548e7d9cb32";
        this.techBoardCustTechProjectId = "65a954eb3b1d7548e7d9cb34";
        this.techBoardCustTechSIDId = "65a954eb3b1d7548e7d9cb35";
        this.techBoardCustTechNotTechId = "65a954eb3b1d7548e7d9cb36";
        this.techBoardCustTechToQualifyId = "65af9cf98d4f759ce85d2a60";  

        this.techBoardCustStatusId = "65a954eb3b1d7548e7d9cb3e";
        this.techBoardCustStatusOpenId = "65a954eb3b1d7548e7d9cb3f";
        this.techBoardCustStatusInProgressId = "65a954eb3b1d7548e7d9cb40";
        this.techBoardCustStatusTestingId = "65a954eb3b1d7548e7d9cb41";
        this.techBoardCustStatusPendingDeliveryId = "65a954eb3b1d7548e7d9cb42";
        this.techBoardCustStatusDeliveredId = "65a954eb3b1d7548e7d9cb43";  
        this.techBoardCustStatusValidatedId = "65a954eb3b1d7548e7d9cb44";  
        this.techBoardCustStatusWaitingId = "65a954eb3b1d7548e7d9cb45";
        this.techBoardCustStatusBlockedId = "65a954eb3b1d7548e7d9cb46";      
        this.techBoardCustStatusCancelledId = "65a954eb3b1d7548e7d9cb47";
    }*/

    constructor(){}

    get opfBoardId(){ return "65a5339acc54164519f0561a";}
    get opfBoardTechListId(){ return "65a5339acc54164519f05621";}
    get opfBoardDoingListId(){ return "65a5339acc54164519f05622";}
    get opfBoardValidatedListId(){ return "65a5339acc54164519f05623";}

    get opfBoardCustPriorityId(){ return "65b3cb5da8d2096df151f434";}
    get opfBoardCustPriorityBlockerId(){ return "65b3eb27e874cfeb8a989611";}
    get opfBoardCustPriorityCriticId(){ return "65b3eb2ad53c682f0b88be7b";}
    get opfBoardCustPriorityMajorId(){ return "65b3eb2dd2ba685e6347f1c1";}
    get opfBoardCustPriorityMinorId(){ return "65b3eb2fff37339c2bda47fd";}
    get opfBoardCustPriorityToQualifyId(){ return "65b3eb34c91e150132d34f69";}

    get opfBoardCustIssuerId(){ return "65b3cb72ed6e154782321735";}
    get opfBoardCustIssuerPBTeamId(){ return "65b3eb52978d1418ec00488f";}
    get opfBoardCustIssuerSupportTradingId(){ return "65b3eb56fd2d9cd2b6c0b38b";}
    get opfBoardCustIssuerTreasuryId(){ return "65b3eb580209c9211e5362f3";}
    get opfBoardCustIssuerValuationId(){ return "65b3eb5b685aeb9c76816193";}
    get opfBoardCustIssuerAccessMarketId(){ return "65b3eb63bfd3a0285d98b0d7";}  
    get opfBoardCustIssuerManagerId(){ return "65b3eb65c25fdade1a7079a3";}  
    get opfBoardCustIssuerToQualifyId(){ return "65b3eb693f12c7d370d50519";}

    get opfBoardCustTechId(){ return "65b3cb86318d868a181a0389";}
    get opfBoardCustTechSupportId(){ return "65b3eb73c4b19cd9d7cbeedd";}
    get opfBoardCustTechProjectId(){ return "65b3eb76d5263fe4bded546d";}
    get opfBoardCustTechSIDId(){ return "65b3eb78ed1de610156e70a6";}
    get opfBoardCustTechNotTechId(){ return "65b3eb7d2cacb867749e3d8c";}
    get opfBoardCustTechToQualifyId(){ return "65b3eb836ba9fb08d1213d61";}  

    get opfBoardCustStatusId(){ return "65b3d5edaf660f2f5bdd1b53";}
    get opfBoardCustStatusOpenId(){ return "65b3eb90979e87894398354a";}
    get opfBoardCustStatusInProgressId(){ return "65b3eb94c49cc36325a1c3b7";}
    get opfBoardCustStatusTestingId(){ return "65b3eb975573907f52c734e0";}
    get opfBoardCustStatusPendingDeliveryId(){ return "65b3eb9a6f590846d9787c0c";}
    get opfBoardCustStatusDeliveredId(){ return "65b3eb9d548e8f99ce5ed7dc";}  
    get opfBoardCustStatusValidatedId(){ return "65b3eb9f351c3e5fcbe7fed3";}  
    get opfBoardCustStatusWaitingId(){ return "65b3eba235d407092e70d969";}
    get opfBoardCustStatusBlockedId(){ return "65b3eba480870508200a2519";}      
    get opfBoardCustStatusCancelledId(){ return "65b3eba84ea65cbbdaff2663";}



    /* SID */
    get sidBoardId(){ return "65a906575cbb2953f63286e9";}
    get sidBoardTechListId(){ return "65a9065c99f90b6028928dcc";}

    get sidBoardCustPriorityId(){ return "65b3ebb4c8c7e797dc0cca9b";}
    get sidBoardCustPriorityBlockerId(){ return "65b3ebc10b7b671945487b10";}
    get sidBoardCustPriorityCriticId(){ return "65b3ebc3faccc97b451837f0";}
    get sidBoardCustPriorityMajorId(){ return "65b3ebc5cdc5cfd03bf37834";}
    get sidBoardCustPriorityMinorId(){ return "65b3ebc69ac2ef30d37f03c8";}
    get sidBoardCustPriorityToQualifyId(){ return "65b3ebc9b8a9674a41c2beb6";}

    get sidBoardCustIssuerId(){ return "65b3ec344cf4eb491d28aa38";}
    get sidBoardCustIssuerPBTeamId(){ return "65b3ec344cf4eb491d28aa39";}
    get sidBoardCustIssuerSupportTradingId(){ return "65b3ec344cf4eb491d28aa3a";}
    get sidBoardCustIssuerTreasuryId(){ return "65b3ec344cf4eb491d28aa3b";}
    get sidBoardCustIssuerValuationId(){ return "65b3ec344cf4eb491d28aa3c";}
    get sidBoardCustIssuerAccessMarketId(){ return "65b3ec344cf4eb491d28aa3d";}  
    get sidBoardCustIssuerManagerId(){ return "65b3ec344cf4eb491d28aa3e";}  
    get sidBoardCustIssuerToQualifyId(){ return "65b3ec344cf4eb491d28aa3f";}

    get sidBoardCustTechId(){ return "65b3ebceb36afe762e5d97ef";}
    get sidBoardCustTechSupportId(){ return "65b3ebdc811c1e4f2642d0da";}
    get sidBoardCustTechProjectId(){ return "65b3ebdf713d646270df703d";}
    get sidBoardCustTechSIDId(){ return "65b3ebe1f56b2c9ca3d759ce";}
    get sidBoardCustTechNotTechId(){ return "65b3ebe5f674c3d052e34162";}
    get sidBoardCustTechToQualifyId(){ return "65b3ebea626f0fa11ea0452d";}  

    get sidBoardCustStatusId(){ return "65b3ec5ce67095f36b4def1e";}
    get sidBoardCustStatusOpenId(){ return "65b3ec5ce67095f36b4def1f";}
    get sidBoardCustStatusInProgressId(){ return "65b3ec5ce67095f36b4def20";}
    get sidBoardCustStatusTestingId(){ return "65b3ec5ce67095f36b4def21";}
    get sidBoardCustStatusPendingDeliveryId(){ return "65b3ec5ce67095f36b4def22";}
    get sidBoardCustStatusDeliveredId(){ return "65b3ec5ce67095f36b4def23";}  
    get sidBoardCustStatusValidatedId(){ return "65b3ec5ce67095f36b4def24";}  
    get sidBoardCustStatusWaitingId(){ return "65b3ec5ce67095f36b4def25";}
    get sidBoardCustStatusBlockedId(){ return "65b3ec5ce67095f36b4def26";}      
    get sidBoardCustStatusCancelledId(){ return "65b3ec5ce67095f36b4def27";}



    /* OPF TECH TASK BOARD */
    get techBoardId(){ return "65a533acf8bdb823367134d5";}
    get techBoardToClassifyListId(){ return "65a533acf8bdb823367134dc";}
    get techBoardProjectListId(){ return "65a533acf8bdb823367134dd";}
    get techBoardSupportListId(){ return "65a533acf8bdb823367134de";}
    get techBoardSIDListId(){ return "65a533e0203b31e91571133e";}
    get techBoardInProgressListId(){ return "65a533ee14a4b7651e1023b9";}
    get techBoardInReviewListId(){ return "65a533f15ffba80f03ae8ac1";}
    get techBoardPendingDeliveryListId(){ return "65a533f5e072331593b68e87";}
    get techBoardDoneListId(){ return "65a533f5e072331593b68e87";}
    get techBoardValidatedListId(){ return "65a533f93359e67ebba68abb";}

    get techBoardCustPriorityId(){ return "65b3ebb4c8c7e797dc0cca9b";}
    get techBoardCustPriorityBlockerId(){ return "65b3ebc10b7b671945487b10";}
    get techBoardCustPriorityCriticId(){ return "65b3ebc3faccc97b451837f0";}
    get techBoardCustPriorityMajorId(){ return "65b3ebc5cdc5cfd03bf37834";}
    get techBoardCustPriorityMinorId(){ return "65b3ebc69ac2ef30d37f03c8";}
    get techBoardCustPriorityToQualifyId(){ return "65b3ebc9b8a9674a41c2beb6";}

    get techBoardCustIssuerId(){ return "65a954eb3b1d7548e7d9cb21";}
    get techBoardCustIssuerPBTeamId(){ return "65b3ec9076d9ac4c4dbdd7f6";}
    get techBoardCustIssuerSupportTradingId(){ return "65a954eb3b1d7548e7d9cb24";}
    get techBoardCustIssuerTreasuryId(){ return "65a954eb3b1d7548e7d9cb25";}
    get techBoardCustIssuerValuationId(){ return "65a954eb3b1d7548e7d9cb26";}
    get techBoardCustIssuerAccessMarketId(){ return "65a954eb3b1d7548e7d9cb27";}  
    get techBoardCustIssuerManagerId(){ return "65a954eb3b1d7548e7d9cb28";}  
    get techBoardCustIssuerToQualifyId(){ return "65af9cf98d4f759ce85d2a5f";}

    get techBoardCustTechId(){ return "65a954eb3b1d7548e7d9cb32";}
    get techBoardCustTechSupportId(){ return "65a954eb3b1d7548e7d9cb32";}
    get techBoardCustTechProjectId(){ return "65a954eb3b1d7548e7d9cb34";}
    get techBoardCustTechSIDId(){ return "65a954eb3b1d7548e7d9cb35";}
    get techBoardCustTechNotTechId(){ return "65a954eb3b1d7548e7d9cb36";}
    get techBoardCustTechToQualifyId(){ return "65af9cf98d4f759ce85d2a60";}  

    get techBoardCustStatusId(){ return "65a954eb3b1d7548e7d9cb3e";}
    get techBoardCustStatusOpenId(){ return "65a954eb3b1d7548e7d9cb3f";}
    get techBoardCustStatusInProgressId(){ return "65a954eb3b1d7548e7d9cb40";}
    get techBoardCustStatusTestingId(){ return "65a954eb3b1d7548e7d9cb41";}
    get techBoardCustStatusPendingDeliveryId(){ return "65a954eb3b1d7548e7d9cb42";}
    get techBoardCustStatusDeliveredId(){ return "65a954eb3b1d7548e7d9cb43";}  
    get techBoardCustStatusValidatedId(){ return "65a954eb3b1d7548e7d9cb44";}  
    get techBoardCustStatusWaitingId(){ return "65a954eb3b1d7548e7d9cb45";}
    get techBoardCustStatusBlockedId(){ return "65a954eb3b1d7548e7d9cb46";}      
    get techBoardCustStatusCancelledId(){ return "65a954eb3b1d7548e7d9cb47";}

}

export default IdsConfigWorkspace;