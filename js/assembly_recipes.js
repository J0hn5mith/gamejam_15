var assemblyRecipes = {

    //House
    "III": {
        target: BuildingCodes.EMPTY,
        title: "Building House Level 1",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            gameLogic.town.addBuilding(BuildingCodes.HOUSE, tile);
        }
    },

    "IOI": {
        target: BuildingCodes.HOUSE,
        title: "Upgrade House to Level 2",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade();
        }
    },

    "XIO": {
        target: BuildingCodes.HOUSE,
        title: "Upgrade House to Level 3",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade();
        }
    },

    "IXI": {
        target: BuildingCodes.HOUSE,
        title: "Increase House productivity",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
        }
    },

    //Farm
    "IIO": {
        target: BuildingCodes.EMPTY,
        title: "Building Farm Level 1",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            gameLogic.town.addBuilding(BuildingCodes.FARM, tile);

        }
    },

    "XII": {
        target: BuildingCodes.FARM,
        title: "Upgrade Farm to Level 2",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade();
        }
    },

    "XOI": {
        target: BuildingCodes.FARM,
        title: "Upgrade Farm to Level 3",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade();
        }
    },

    "IIX": {
        target: BuildingCodes.FARM,
        title: "Increase Farm productivity",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
        }
    },

    //Factory
    "OIO": {
        target: BuildingCodes.EMPTY,
        title: "Building Factory Level 1",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            gameLogic.town.addBuilding(BuildingCodes.FACTORY, tile);
        }
    },

    "OOI": {
        target: BuildingCodes.FACTORY,
        title: "Upgrade Factory to Level 2",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade();
        }
    },

    "XXO": {
        target: BuildingCodes.FACTORY,
        title: "Upgrade Factory to Level 3",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade();
        }
    },

    "XOO": {
        target: BuildingCodes.FACTORY,
        title: "Increase Factory productivity",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
        }
    },

    //Steamengine
    "OII": {
        target: BuildingCodes.EMPTY,
        title: "Building Steamengine Level 1",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            gameLogic.town.addBuilding(BuildingCodes.STEAM_PLANT, tile);
        }
    },

    "IOO": {
        target: BuildingCodes.STEAM_PLANT,
        title: "Upgrade Steamengine to Level 2",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade();
        }
    },

    "OXX": {
        target: BuildingCodes.STEAM_PLANT,
        title: "Upgrade Steamengine to Level 3",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade();
        }
    },

    "OOX": {
        target: BuildingCodes.STEAM_PLANT,
        title: "Increase Steamengine productivity",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
        }
    },


    /************************
     Minitru
     ************************/
    "XXI": {
        target: BuildingCodes.EMPTY,
        title: "Building Minitru Level 1",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            gameLogic.town.addBuilding(BuildingCodes.MINI_TRU, tile);
        }
    },

    "XXT": {
        target: BuildingCodes.MINI_TRU,
        title: "Upgrade Minitru to Level 2",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
            tile.building.upgrade()
        },
        levelRequirements:{
            min: 1,
            max: 1
        }
    },

    "XTT": {
        target: BuildingCodes.MINI_TRU,
        title: "Upgrade Minitru to Level 3",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade()
        },
        levelRequirements:{
            min: 2,
            max: 2
        }
    },

    "IOT": {
        target: BuildingCodes.MINI_TRU,
        title: "Increase Minitru productivity",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
        }
    },


    /************************
     Minilov
     ************************/
    "IXX": {
        target: BuildingCodes.EMPTY,
        title: "Building Minilov Level 1",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            gameLogic.town.addBuilding(BuildingCodes.MINI_LOV, tile);
        }
    },

    "TXX": {
        target: BuildingCodes.MINI_LOV,
        title: "Upgrade Minilov to Level 2",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade()

        },
        levelRequirements:{
            min: 1,
            max: 1
        }
    },

    "TTX": {
        target: BuildingCodes.MINI_LOV,
        title: "Upgrade Minilov to Level 3",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade();
        },
        levelRequirements:{
            min: 2,
            max: 2
        }
    },

    "TOI": {
        target: BuildingCodes.MINI_LOV,
        title: "Increase Minilov productivity",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade();
        }
    },


    /************************
     CANON
     ************************/
    "XIX": {
        target: BuildingCodes.EMPTY,
        title: "Building Canon Level 1",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
            tile.building.upgrade()
        }
    },

    "XTX": {
        target: BuildingCodes.CANON,
        title: "Upgrade Canon to Level 2",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
            tile.building.upgrade()
        }
    },

    "TXT": {
        target: BuildingCodes.CANON,
        title: "Upgrade Canon to Level 3",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade()
        }
    },

    "TIO": {
        target: BuildingCodes.CANON,
        title: "Increase Canon productivity",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
        }
    },

    /************************
     TOWER
     ************************/
    "OOO": {
        target: BuildingCodes.TOWER,
        title: "Upgrade Tower to Level 2-3",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade()
        },
        levelRequirements:{
           min: 0,
            max: 2
        }
    },

    "XXX": {
        target: BuildingCodes.TOWER,
        title: "Upgrade Tower to Level 4-5",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
            tile.building.upgrade()
        },
        levelRequirements:{
            min: 3,
            max: 4
        }
    },

    "TTT": {
        target: BuildingCodes.TOWER,
        title: "Upgrade Tower to Level 6-7",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            tile.building.upgrade()
        },
        levelRequirements:{
            min: 5,
            max: 6
        }
    },

    /************************
     RESOURCES
     ************************/
    "IIX": {
        target: null,
        title: "Exchange for Random Resources",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
        }
    },

    "OXI": {
        target: null,
        title: "Exchange for one Random Component",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
        }
    },

    //Defense
    "OXO": {
        target: BuildingCodes.ANY,
        title: "Send mobile Canon for defense destrict",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
        }
    },

    "OIX": {
        target: BuildingCodes.ANY,
        title: "Send a Bomb Disarming Robot to decrease attack chance",
        description: "Drag upgrade icon unto desired tile.",
        action: function(tile) {
            alert("HALLO");
        }
    }
};