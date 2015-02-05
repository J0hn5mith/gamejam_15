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
    NONE: 10
};


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

    building.updateNeighbourhood();

    return building;
};


function Farm() {
    this.code = BuildingCodes.FARM;
    this.tile = null;
    this.level = 1;

    this.update = function(timeDelta) {

    };


    this.updateNeighbourhood = function() {

    };


    this.getIsActive = function() {
        return true;
    };


    this.upgrade = function() {
        this.level++;
    };
}
Farm.RANGE = 2;
Farm.COLOR_CODE = 0x0B610B;


function House() {
    this.code = BuildingCodes.HOUSE;
    this.tile = null;
    this.level = 1;
    this.farmsInRange = [];
    this.isActive = true;

    this.update = function(timeDelta) {

    };


    this.updateNeighbourhood = function() {
        this.farmsInRange = this.getFarmsInRange();
    };


    this.getIsActive = function() {
        return this.hasActiveFarmInRange();
    };


    this.hasActiveFarmInRange = function() {
        for (var i in this.farmsInRange) {
            var farm = this.farmsInRange[i];
            if (farm.getIsActive()) {
                return true
            }
        }
        return false;

    };


    this.upgrade = function() {
        this.level++;
    };


    this.getFarmsInRange = function() {
        return this.town.getBuildingsOfTypeInRange(
            this.tile.position,
            Farm.RANGE,
            BuildingCodes.FARM
        );
    };
}
House.RANGE = 2;
House.COLOR_CODE = 0xB45F04;


function Factory() {
    this.code = BuildingCodes.FACTORY;
    this.tile = null;
    this.level = 1;
    this.debugColor = 0xffff00;
    this.timer = 0;
    this.housesInRange = [];
    this.steamPlantsInRange = [];

    this.update = function(timeDelta) {
        if (this.getIsActive()){
            this.timer += timeDelta;
        }
    };

    this.updateNeighbourhood = function() {
        this.steamPlantsInRange = this.getSteamPlantsInRange();
        this.housesInRange = this.getHousesInRange();
    };

    this.upgrade = function() {
        this.level++;
    };

    this.getIsActive = function() {
        return this.hasActiveHouseInRange() && this.hasActivePlantInRange();
    };


    this.hasActivePlantInRange = function() {
        for (var i = 0; i < this.steamPlantsInRange.length; i++) {
            var plant = this.steamPlantsInRange[i];

            if (plant.getIsActive()) {
                return true
            }
        }
        return false;

    };


    this.hasActiveHouseInRange = function() {
        for (var i in this.housesInRange) {
            var house = this.housesInRange[i];

            if (house.getIsActive()) {
                return true;
            }
        }
        return false;

    };

    this.getHousesInRange = function() {
        return this.town.getBuildingsOfTypeInRange(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
    };


    this.getSteamPlantsInRange = function() {
        return this.town.getBuildingsOfTypeInRange(
            this.tile.position,
            SteamPlant.RANGE,
            BuildingCodes.STEAM_PLANT
        )
    };


    this.harvestComponents = function() {
        var components = new ComponentsState();
        if (this.timer >= 1 && this.getIsActive()) {
            this.timer -= 1;

            var max = 3;
            if (this.town.tower.level > 2){
                max++;
            }

            switch (rand(1,max)){
                case 1:
                    components.beams++;
                    break;
                case 2:
                    components.pipes++;
                    break;
                case 3:
                    components.gears++;
                    break;
                case 4:
                    components.pistons++;
                    break;
            }
        }
        return components;
    }
}
Factory.COLOR_CODE = 0xA4A4A4;


function SteamPlant() {
    this.code = BuildingCodes.STEAM_PLANT;
    this.tile = null;
    this.level = 1;
    this.timer = 0;
    this.isActive = true;


    this.update = function(timeDelta) {
        if (this.getIsActive()) {
            this.timer += timeDelta;
        }
    };


    this.updateNeighbourhood = function() {
        this.housesInRange = this.getHousesInRange();
    };


    this.getIsActive = function() {
        return this.isActive && this.hasActiveHouseInRange();

    };


    this.hasActiveHouseInRange = function() {
        for (var i in this.housesInRange) {
            var house = this.housesInRange[i];

            if (house.getIsActive()) {
                return true;
            }
        }
        return false;

    };


    this.upgrade = function() {
        this.level++;
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


    this.getHousesInRange = function() {
        return this.town.getBuildingsOfTypeInRange(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
    };
}
SteamPlant.RANGE = 1;
SteamPlant.COLOR_CODE = 0xF2F2F2;


function MiniLov() {
    this.code = BuildingCodes.MINI_LOV;
    this.tile = null;
    this.level = 1;
    this.housesInRange = [];


    this.update = function(timeDelta) {
    };


    this.updateNeighbourhood = function() {
        this.housesInRange = this.getHousesInRange();
    };


    this.getIsActive = function() {
        return this.hasActiveHouseInRange();
    };


    this.upgrade = function() {
        this.level++;
    };


    this.hasActiveHouseInRange = function() {
        for (var i in this.housesInRange) {
            var house = this.housesInRange[i];

            if (house.getIsActive()) {
                return true;
            }
        }
        return false;

    };

    this.getHousesInRange = function() {
        return this.town.getBuildingsOfTypeInRange(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
    };

}
MiniLov.COLOR_CODE = 0xFE2EC8;


function MiniTru() {
    this.code = BuildingCodes.MINI_TRU;
    this.tile = null;
    this.level = 1;
    this.housesInRange = [];

    this.update = function(timeDelta) {
    };


    this.upgrade = function() {
        this.level++;
    };


    this.getIsActive = function() {
        return this.hasActiveHouseInRange();
    };


    this.updateNeighbourhood = function() {
        this.housesInRange = this.getHousesInRange();
    };


    this.hasActiveHouseInRange = function() {
        for (var i in this.housesInRange) {
            var house = this.housesInRange[i];

            if (house.getIsActive()) {
                return true;
            }
        }
        return false;

    };


    this.getHousesInRange = function() {
        return this.town.getBuildingsOfTypeInRange(
            this.tile.position,
            House.RANGE,
            BuildingCodes.HOUSE
        );
    };
}
MiniTru.COLOR_CODE = 0x2E64FE;


function Tower() {
    this.code = BuildingCodes.TOWER;
    this.tile = null;
    this.level = 1;
    this.steamPlantsInRange = [];


    this.update = function(timeDelta) {

    };


    this.updateNeighbourhood = function() {

    };


    this.upgrade = function() {
        this.level++;
        gameLogic.map.increaseCurrentRadius();
    };


    this.updateSteamPlantsInRange = function() {
        this.plantsInRange = this.town.getBuildingsOfTypeInRange(this.tile.position,
            SteamPlant.RANGE,
            BuildingCodes.STEAM_PLANT
        )
    };
}
Tower.COLOR_CODE = 0x000000;

function Canon() {
    this.code = BuildingCodes.CANON;
    this.tile = null;
    this.level = 1;
    this.steamPlantsInRange = [];


    this.update = function(timeDelta) {

    };


    this.getIsActive = function() {
        return this.hasActiveHouseInRange() && this.hasActivePlantInRange();
    };


    this.getSteamPlantsInRange = function() {
        return this.town.getBuildingsOfTypeInRange(
            this.tile.position,
            SteamPlant.RANGE,
            BuildingCodes.STEAM_PLANT
        )
    };


    this.updateNeighbourhood = function() {
        this.steamPlantsInRange = this.getSteamPlantsInRange();
    };


    this.upgrade = function() {
        this.level++;
    };


    this.hasActivePlantInRange = function() {
        for (var i = 0; i < this.steamPlantsInRange.length; i++) {
            var plant = this.steamPlantsInRange[i];

            if (plant.getIsActive()) {
                return true
            }
        }
        return false;

    };

}
Canon.COLOR_CODE = 0xFE2E2E;


function BuildingModel() {

}

BuildingModel.make = function(code) {
    var color = null;
    var geometry = new THREE.CylinderGeometry(0.1, 0.1, 5.0, 32);
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
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    cylinder.frustumCulled = false; // prevents errors while generating shadows
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
