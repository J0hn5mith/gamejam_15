/**
 * Created by janmeier on 24.01.15.
 *
 */
var BuildingConstants = {
    COAL_CONSUMPTION: 1,
    COAL_CONSUMPTION_INTERVAL: 1,
    FACTORY_PRODUCTION_INTERVAL: 1
};

var BuildingCodes = {
    EMPTY: -1,
    FARM: 0,
    HOUSE: 1,
    FACTORY: 2,
    STEAM_PLANT: 3,
    MINI_LOV: 4,
    MINI_TRU: 5,
    CANON: 6,
    TOWER: 7,
    NONE: 10,
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
        if (!toDelete) {
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
    this.code = BuildingCodes.FARM;
    this.tile = null;
    this.level = 1;

    this.update = function(timeDelta) {

    };

    this.upgrade = function() {
        this.level ++;
    };
}
Farm.RANGE = 2;
Farm.COLOR_CODE = 0x00ffff;


function House() {
    this.code = BuildingCodes.HOUSE;
    this.tile = null;
    this.level = 1;
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
    };

    this.upgrade = function() {
        this.level++;

    };
}
House.RANGE = 2;
House.COLOR_CODE = 0xff00ff;


function Factory() {
    this.code = BuildingCodes.FACTORY;
    this.tile = null;
    this.level = 1;
    this.debugColor = 0xffff00;
    this.timer = 0;

    this.update = function(timeDelta) {
        var hasFarm = this.checkForHouse();
        var hasPlant = true;
        this.isActive = hasFarm && hasPlant;
        this.timer += timeDelta;
    };

    this.upgrade = function() {
        this.level++;

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
            components.gears = 1;
        }
        return components;

    }
}
Factory.COLOR_CODE = 0xff00ff;


function SteamPlant() {
    this.code = BuildingCodes.STEAM_PLANT;
    this.tile = null;
    this.level = 1;
    this.timer = 0;
    this.isActive = true;


    this.update = function(timeDelta) {
        this.timer += timeDelta;
    };


    this.upgrade = function() {
        this.level ++;
    };


    this.fuel = function(playerState) {
        var resources = playerState.resources;
        var resourcesTrend = playerState.resourceTrend;
        var consumption = BuildingConstants.COAL_CONSUMPTION;

        if (this.timer >= BuildingConstants.COAL_CONSUMPTION_INTERVAL) {
            this.timer -= BuildingConstants.COAL_CONSUMPTION_INTERVAL;
            if (consumption > resources.coal) {
                this.isActive = false;
            }
            else {
                resourcesTrend.coal -= consumption;
                this.isActive = true;
            }
        }
        return this.isActive;
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
SteamPlant.COLOR_CODE = 0x00ff00;


function MiniLov() {
    this.code = BuildingCodes.MINI_LOV;
    this.tile = null;
    this.level = 1;
    this.isActive = false;


    this.update = function(timeDelta) {
        this.isActive = this.checkForHouse();
    };


    this.upgrade = function() {
        this.level ++;
    };


    this.checkForHouse = function() {
        return this.town.checkForBuilding(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
    };

}
MiniLov.COLOR_CODE = 0x0000ff;


function MiniTru() {
    this.code = BuildingCodes.MINI_TRU;
    this.tile = null;
    this.level = 1;
    this.plantsInRange = false;

    this.update = function(timeDelta) {
        this.isActive = this.checkForHouse();
    };


    this.upgrade = function() {
        this.level ++;
    };


    this.checkForHouse = function() {
        return this.town.checkForBuilding(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
    };
}
MiniTru.COLOR_CODE = 0xff0000;


function Tower() {
    this.code = BuildingCodes.TOWER;
    this.tile = null;
    this.level = 1;
    this.steamPlantsInRange = [];


    this.update = function(timeDelta) {

    };


    this.upgrade = function() {
        this.level ++;
    };


    this.updateSteamPlantsInRange = function() {
        this.plantsInRange = this.town.getBuildingsOfTypeInRange(this.tile.position,
            SteamPlant.RANGE,
            BuildingCodes.STEAM_PLANT
        )
    };
}
Tower.COLOR_CODE = 0xff9900;

function Canon() {
    this.code = BuildingCodes.CANON;
    this.tile = null;
    this.level = 1;
    this.steamPlantsInRange = [];


    this.update = function(timeDelta) {

    };


    this.upgrade = function() {
        this.level ++;
    };

}
Canon.COLOR_CODE = 0xff99ff;


function BuildingModel() {

}

BuildingModel.make = function(code) {
    var color = null;
    var geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32);
    switch (code) {
        case BuildingCodes.FARM:
            color = Farm;
            color = Farm.COLOR_CODE;
            geometry = new THREE.CylinderGeometry(0.1, 0.1, 1.0, 32);
            break;
        case BuildingCodes.HOUSE:
            color = House.COLOR_CODE;
            geometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32);
            break;
        case BuildingCodes.FACTORY:
            color = Factory.COLOR_CODE;
            geometry = new THREE.CylinderGeometry(0.1, 0.1, 2.0, 32);
            break;
        case BuildingCodes.STEAM_PLANT:
            color = SteamPlant.COLOR_CODE;
            geometry = new THREE.CylinderGeometry(0.1, 0.1, 2.5, 32);
            break;
        case BuildingCodes.MINI_LOV:
            color = MiniLov.COLOR_CODE;
            geometry = new THREE.CylinderGeometry(0.1, 0.1, 3.0, 32);
            break;
        case BuildingCodes.MINI_TRU:
            color = MiniTru.COLOR_CODE;
            geometry = new THREE.CylinderGeometry(0.1, 0.1, 3.5, 32);
            break;
        case BuildingCodes.CANON:
            color = Canon.COLOR_CODE;
            geometry = new THREE.CylinderGeometry(0.1, 0.1, 4.0, 32);
            break;
        case BuildingCodes.TOWER:
            color = Tower.COLOR_CODE;
            break;
        case BuildingCodes.NONE:
            //
            break;
    }
    var material = new THREE.MeshBasicMaterial({color: color});
    var cylinder = new THREE.Mesh(geometry, material);
    return cylinder;

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

BuildingBuff.make = function(duration, onStartFunction, onEndFunction) {
    var buff = new BuildingBuff();
    buff.duration = duration;
    buff.onStartFunction = onStartFunction;
    buff.onEndFunction = onEndFunction;
    return buff;
};
