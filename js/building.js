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
        var i = 10;
    };


    this.update = function(timeDelta){

    };
}


function House() {
    this.tile;
    this.debugColor = 0xff00ff;
    this.code = BuildingCodes.HOUSE;
    this.hasFarmInrang = false;
    this.isActive = ture;

    this.init = function(tile) {
        var i = 10;

    };

    this.update = function(timeDelta){
        this.isActive = this.checkForFarm();

    };

    this.checkForFarm = function(){

    }
}


function Factory() {
    this.tile;
    this.debugColor = 0xffff00;
    this.code = BuildingCodes.FACTORY;
    this.hasSteamPlantInrange = false;

    this.init = function(tile) {

    };

    this.update = function(timeDelta){

    };
}


function SteamPlant() {
    this.code = BuildingCodes.STEAM_PLANT;
    this.debugColor = 0x00ff00;
    this.isActive = true;

    this.init = function(tile) {

    };

    this.update = function(timeDelta){

    };

    this.fuel = function(resources){
        var consumption = this.getCurrentConsumption();

        if (consumption > resources.coal){
            return false;
        }

        resources.coal -= consumption;
        return true;

    };

    this.getCurrentConsumption = function(){
        return 10;
    }


    this.setIsActive = function(isActive){
        this.isActive = isActive;

    }

}


function MiniLov() {
    this.tile;
    this.debugColor = 0x0000ff;
    this.code = BuildingCodes.MINI_LOV;
    this.hasHouseInRange = false;


    this.init = function(tile) {

    };


    this.update = function(timeDelta){

    };

}


function MiniTru() {
    this.tile;
    this.debugColor = 0xff0000;
    this.code = BuildingCodes.MINI_TRU;
    this.plantsInRange = false;

    this.init = function(tile) {

    };


    this.update = function(timeDelta){

    };

}


function Tower() {
    this.tile;
    this.debugColor = 0xff9900;
    this.code = BuildingCodes.TOWER;
    this.plantsInRange =[];

    this.init = function(tile) {

    };


    this.update = function(timeDelta){

    };
}

function DrawableBuilding() {

}
