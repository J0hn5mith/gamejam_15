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
    this.town;

    this.init = function(tile, town) {

    };
}


Building.make = function(code, tile, town) {
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
    building.tile = tile;
    building.town = town;
    return building;
};


function Farm() {
    this.tile;
    this.debugColor = 0x00ffff;
    this.code = BuildingCodes.FARM;

    this.update = function(timeDelta){

    };
}
Farm.RANGE = 2;


function House() {
    this.tile;
    this.debugColor = 0xff00ff;
    this.code = BuildingCodes.HOUSE;
    this.hasFarmInrang = false;
    this.isActive = true;

    this.update = function(timeDelta){
        this.isActive = this.checkForFarm();
        if (!this.isActive){
           var i = 0;
        }

    };

    this.checkForFarm = function(){
        return this.town.checkForBuilding(
            this.tile.position,
            Farm.RANGE,
            BuildingCodes.FARM
        );
    }
}
House.RANGE = 2;


function Factory() {
    this.tile;
    this.debugColor = 0xffff00;
    this.code = BuildingCodes.FACTORY;
    this.hasSteamPlantInrange = false;

    this.update = function(timeDelta){
        var hasFarm = this.checkForHouse();
        var hasPlant = true;
        this.isActive = hasFarm && hasPlant;

    };

    this.checkForHouse = function(){
        return this.town.checkForBuilding(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
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
    };


    this.setIsActive = function(isActive){
        this.isActive = isActive;

    };

    this.checkForHouse = function(){
        return this.town.checkForBuilding(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
    };
}



function MiniLov() {
    this.tile;
    this.debugColor = 0x0000ff;
    this.code = BuildingCodes.MINI_LOV;
    this.isActive = false;

    this.init = function(tile) {

    };


    this.update = function(timeDelta){
        this.isActive = this.checkForHouse();

    };

    this.checkForHouse = function(){
        return this.town.checkForBuilding(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
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
        this.isActive = this.checkForHouse();
    };

    this.checkForHouse = function(){
        return this.town.checkForBuilding(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
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
