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
    CANON: 6,
	TOWER: 7,
	NONE: 10
}


function Building() {
    this.tile;
    this.code;
    this.town;
    this.buffs = [];

    this.init = function(tile, town) {

    };
}


Building.updateBuffs = function(building, timeDelta) {
    var newBuffList = [];
    for (var i = 0; i < building.buffs.length; i++) {
        var buff = building.buffs[i];
        var toDelete = buff.update(timeDelta);
        if (!toDelete){
            newBuffList.push(buff)
        }
    }
    building.buffs = newBuffList;
};


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
        case BuildingCodes.CANON:
            building = new Canon();
            break;
		case BuildingCodes.TOWER:
            building = new Tower();
            break;
		case BuildingCodes.NONE:
            //
            break;
    }
    building.tile = tile;
    building.town = town;
    building.buffs = [];

    if (building.code == BuildingCodes.FACTORY || building.code == BuildingCodes.TOWER) {
        building.updateSteamPlantsInRange();

    }
    return building;
};


function Farm() {
    this.tile;
    this.debugColor = 0x00ffff;
    this.code = BuildingCodes.FARM;

    this.update = function(timeDelta) {

    };
}
Farm.RANGE = 2;


function House() {
    this.tile;
    this.debugColor = 0xff00ff;
    this.code = BuildingCodes.HOUSE;
    this.hasFarmInrang = false;
    this.isActive = true;

    this.update = function(timeDelta) {
        this.isActive = this.checkForFarm();
        if (!this.isActive) {
            var i = 0;
        }

    };

    this.checkForFarm = function() {
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
    this.steamPlantsInRange = [];
    this.justBuilt = true;
    this.timer = 0;

    this.update = function(timeDelta) {
        var hasFarm = this.checkForHouse();
        var hasPlant = true;
        this.isActive = hasFarm && hasPlant;
        this.timer += timeDelta;
    };

    this.getIsActive = function() {
        var hasFarm = this.checkForHouse();
        var hasPlant = true;
        return hasFarm && this.hasActivePlantInRange();
    };

    this.hasActivePlantInRange = function() {
        for (var i = 0; i < this.plantsInRange.length; i++) {
            var plant = this.plantsInRange[i];

            if (plant.isActive) {
                return true;
            }
        }
        return false;

    };

    this.checkForHouse = function() {
        return this.town.checkForBuilding(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
    };


    this.updateSteamPlantsInRange = function() {
        this.plantsInRange = this.town.getBuildingsOfTypeInRange(this.tile.position,
            SteamPlant.RANGE,
            BuildingCodes.STEAM_PLANT
        )
    };


    this.harvestComponents = function() {
        var components = new ComponentsState();
        if (this.timer >= 1 && this.getIsActive()) {
            this.timer -= 1;
            components.gears = 10;
        }
        components.gears = 10;
        return components;

    }
}


function SteamPlant() {
    this.code = BuildingCodes.STEAM_PLANT;
    this.debugColor = 0x00ff00;
    this.isActive = true;

    this.init = function(tile) {

    };

    this.update = function(timeDelta) {

    };

    this.fuel = function(resources) {
        var consumption = this.getCurrentConsumption();

        if (consumption > resources.coal) {
            return false;
        }

        resources.coal -= consumption;
        return true;

    };

    this.getCurrentConsumption = function() {
        return 10;
    };


    this.setIsActive = function(isActive) {
        this.isActive = isActive;

    };

    this.checkForHouse = function() {
        return this.town.checkForBuilding(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
    };
}
SteamPlant.RANGE = 1;


function MiniLov() {
    this.tile;
    this.debugColor = 0x0000ff;
    this.code = BuildingCodes.MINI_LOV;
    this.isActive = false;

    this.init = function(tile) {

    };


    this.update = function(timeDelta) {
        this.isActive = this.checkForHouse();

    };

    this.checkForHouse = function() {
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

    this.update = function(timeDelta) {
        this.isActive = this.checkForHouse();
    };

    this.checkForHouse = function() {
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
    this.steamPlantsInRange = [];


    this.update = function(timeDelta) {

    };


    this.updateSteamPlantsInRange = function() {
        this.plantsInRange = this.town.getBuildingsOfTypeInRange(this.tile.position,
            SteamPlant.RANGE,
            BuildingCodes.STEAM_PLANT
        )
    };
}

function Canon() {
    this.tile;
    this.debugColor = 0xff99ff;
    this.code = BuildingCodes.CANON;
    this.steamPlantsInRange = [];


    this.update = function(timeDelta) {

    };

}


function DrawableBuilding() {

}

function BuildingBuff() {
    this.id = 0;
    this.duration = 0;
    this.lifeTime = 0;
    this.onStartFunction = null;
    this.onEndFunction = null;
    this.markedToDelte = false;

    this.assignToBuilding = function(building) {
        this.building = building;
        this.building.buffs.push(building);
        this.onStart();
    };

    this.removeFromBuilding = function() {
        this.onEnd();
    };

    this.update = function(timeDelta) {
        this.lifeTime += timeDelta;
        if (this.lifeTime <= this.duration) {
            this.removeFromBuilding();
            return false;
        }

    };


    this.onStart = function() {
        if (this.onStartFunction) {
            this.onStartFunction(this.building);
        }

    };

    this.onEnd = function() {
        if (this.onEndFunction) {
            this.onEndFunction(this.building);
        }
    };
}

BuildingBuff.make = function(duration, onStartFunction, onEndFunction){
    var buff = new BuildingBuff();
    buff.duration = duration;
    buff.onStartFunction = onStartFunction;
    buff.onEndFunction = onEndFunction;
    return buff;
};
