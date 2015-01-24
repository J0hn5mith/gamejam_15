/**
 *
 * Created by janmeier on 24.01.15.
 */



function Town() {
    this.map;
    this.buildings = [];
    this.addedBuildings = [];
    this.removedBuildings = [];

    this.activePlants = [];
    this.inactivePlants = [];

    this.init = function(map) {
        this.map = map;
        this.activePlants = [];
        this.inactivePlants = [];

    };


    this.update = function(timeDelta, playerState) {
        this.updateSteamPlants(timeDelta, playerState);
        for(var i = 0; i < this.buildings.length; i++){
            var building = this.buildings[i];
            building.update(timeDelta);
        }


    };


    this.updateSteamPlants = function(timeDelta, playerState) {
        var outOfCoal = false;
        for (var i = 0; i < this.activePlants.length; i++) {
            var plant = this.activePlants[i];
            if (!outOfCoal) {
                outOfCoal = plant.fuel(playerState.resources);
            }

            if (!outOfCoal) {
                plant.setIsActive(false);
                var index = this.activePlants.indexOf(plant);
                this.activePlants.splice(index, 1);
                this.inactivePlants.push(plant);
            }
        }

        if (outOfCoal) {
            return;
        }

        for (var i = 0; i < this.inactivePlants.length; i++) {
            var plant = this.inactivePlants[i];
            var success = plant.fuel(playerState.resources);
            if (!success) {
                return;
            }
            var index = this.inactivePlants.indexOf(plant);
            this.inactivePlants.splice(index, 1);
            this.activePlants.push(plant)
        }


    };

    this.addBuilding = function(building, tile) {
        tile.addBuilding(building);
        this.addedBuildings.push(building);
        this.buildings.push(building);

        switch (building.code) {
            case BuildingCodes.STEAM_PLANT:
                this.activePlants.push(building);
                break;
        }
    };

    this.removeBuilding = function(building) {
        // Remove the buidling from the tiles
        s.remove(building.tile.shape);
        this.removedBuildings.push(building);
        var index = this.buildings.indexOf(building);
        this.buildings.splice(index,1);

        switch (building.code) {
            case BuildingCodes.STEAM_PLANT:
                this.removePlant(building)
                break;
        }
    };

    this.removePlant = function(plant){
        var index = this.activePlants.indexOf(plant);
        if (index >=0){
            this.activePlants.splice(index, 1);
            return;
        }

        index = this.inactivePlants.indexOf(plant);
        if (index >=0){
            this.inactivePlants.splice(index, 1);
            this.activePlants.splice(index, 1);
            return;
        }
        else{
            console.log("Something strange happened:)")
        }


    }


}

Town.make = function(map) {
    var town = new Town();
    town.init(map);
    return town;
};
