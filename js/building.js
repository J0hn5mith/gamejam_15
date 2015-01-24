/**
 * Created by janmeier on 24.01.15.
 *
 */
var BuildingCodes = {
    FARM: 0,
    HOUSE: 1,
    FACTORY: 2,
    STEAM_PLANT: 3,
    MINI_LOV: 4,
    MINI_TRU: 5,
    TOWER: 6
}


function Building() {
    this.tile;
    this.code;

    this.init = function(tile) {

    };
}
Building.make = function(code, tile) {
    var building = null;
    switch (code) {
        case BuildingCodes.FARM:
            building = new Farm();
            break;
        case BuildingCodes.HOUSE:
            building = new House();
            break;
        case BuildingCodes.FACTORY:
            building = new Factory();
            break;
        case BuildingCodes.STEAM_PLANT:
            building = new SteamPlant();
            break;
        case BuildingCodes.MINI_LOV:
            building = new MiniLov();
            break;
        case BuildingCodes.MINI_TRU:
            building = new MiniTru();
            break;
        case BuildingCodes.TOWER:
            building = new Tower();
            break;

    }
    building.init(tile);
    return building;
};


function Farm() {
    this.tile;
    this.debugColor = 0x00ffff;
    this.code = BuildingCodes.FARM;

    this.init = function(tile) {

    };
}


function House() {
    this.tile;
    this.debugColor = 0xff00ff;
    this.code = BuildingCodes.HOUSE;
    this.hasFarmInrang = false;

    this.init = function(tile) {

    };
}


function Factory() {
    this.tile;
    this.debugColor = 0xffff00;
    this.code = BuildingCodes.FACTORY;
    this.hasSteamPlantInrange = false;

    this.init = function(tile) {

    };
}


function SteamPlant() {
    this.STEAM_PLANT;
    this.debugColor = 0x00ff00;
    this.plantsInRange =[];

    this.init = function(tile) {

    };

}


function MiniLov() {
    this.tile;
    this.debugColor = 0x0000ff;
    this.code = BuildingCodes.MINI_LOV;
    this.hasHouseInRange = false;

    this.init = function(tile) {

    };

}


function MiniTru() {
    this.tile;
    this.debugColor = 0xff0000;
    this.code = BuildingCodes.MINI_TRU;
    this.plantsInRange = false;

    this.init = function(tile) {

    };

}


function Tower() {
    this.tile;
    this.debugColor = 0xff9900;
    this.code = BuildingCodes.TOWER;
    this.plantsInRange =[];

    this.init = function(tile) {

    };

}

function DrawableBuilding() {

}
