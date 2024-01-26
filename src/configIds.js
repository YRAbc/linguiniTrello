// post.js
// Made by Yoann Raton, 26/01/2024

class ConfIds {
    constructor() {

        /* OPF ToDo Liss */
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



        /* SID */
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



        /* OPF TECH TASK BOARD */
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
    }

}

export default ConfIds;