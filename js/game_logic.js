/**
 *
 * Created by janmeier on 23.01.15.
 */



function GameLogic() {
    this.NUM_TOWNS = 6;

    this.playerState;
    this.neighbourTowns;

    this.neighbourTownEffectQueue = new NeighbourTownEffectQueue();
    this.map = new Map();
    this.init = function () {
        this.playerState = new PlayerState();
        this.map = new Map();
        this.map.init(10);
        this.initNeighbourCities();
    };

    this.initNeighbourCities = function () {
        this.neighbourTowns = [];
        for (var i = 0; i < this.NUM_TOWNS; i++) {
            this.neighbourTowns.push(NeighbourTown.makeNeighbourTown());
        }
    };

    this.update = function (timeDelta) {
        this.updateNeighbours(timeDelta);
        this.harvestResources();

        this.applyNeighbourTownEffects();

    };

    this.updateNeighbours = function (timeDelta) {
        for (var i = 0; i < this.NUM_TOWNS; i++) {
            neigbourTown = this.neighbourTowns[i];
            neigbourTown.update(timeDelta);
        }
    };

    this.harvestResources = function () {

        var resourcesIncome = new ResourcesState();
        for (var i = 0; i < this.NUM_TOWNS; i++) {
            var town = this.neighbourTowns[i];
            resourcesIncome.add(town.harvestResources());
        }
        this.playerState.resources.add(resourcesIncome);
    };

    this.applyNeighbourTownEffects = function () {
        for (var entry; entry = this.neighbourTownEffectQueue.getEntry();) {
            var targetTown = this.neighbourTowns[entry.targetTown];
            targetTown.applyEffect(entry.effect);
        }

    }
};

GameLogic.makeGameLogic = function () {
    var gameLogic = new GameLogic();
    gameLogic.init();
    return gameLogic;

};

