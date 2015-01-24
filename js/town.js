/**
 *
 * Created by janmeier on 24.01.15.
 */



function Town() {
    this.map;

    this.init = function(map) {
        this.map = map;

    };

    this.update = function(timeDelta){

    }

    this.addBuilding = function(building, tile) {
        tile.addBuilding(building);
    };
}

Town.make = function(map) {
    var town = new Town();
    town.init(map);
    return town;
};
