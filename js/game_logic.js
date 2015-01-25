/**
 *
 * Created by janmeier on 23.01.15.
 */

function GameLogic() {
  
    this.NUM_TOWNS = 6;

    this.playerState;
    this.neighbourTowns;

    this.neighbourTownEffectQueue = new NeighbourTownEffectQueue();
    this.neighbourTownEvents = [];
    this.map = new Map();
    this.town = new Town();
    
    this.assembler;


    this.init = function() {
      
        this.playerState = new PlayerState();
        this.playerState.init();
        
        this.map = new Map();
        this.map.init(6);
        this.neighbourTownEvents = [];
        this.initNeighbourCities();
        this.town = Town.make(this.map);
        
        this.assembler = new Assembler();
        this.assembler.init();
    };

    
    this.initNeighbourCities = function() {
        this.neighbourTowns = [];
        for (var i = 0; i < this.NUM_TOWNS; i++) {
            this.neighbourTowns.push(NeighbourTown.makeNeighbourTown());
        }
    };

    
    this.update = function(timeDelta) {
        this.updateNeighbours(timeDelta);
        this.harvestResources();
        this.handleNeighbourTownEvents();
        this.applyNeighbourTownEffects();

        this.town.update(timeDelta, this.playerState);
        //console.log("Resouces", this.playerState.resources.coal);
    };

    
    this.updateNeighbours = function(timeDelta) {
        for (var i = 0; i < this.NUM_TOWNS; i++) {
            neigbourTown = this.neighbourTowns[i];
            neigbourTown.update(timeDelta);
        }
    };

    
    this.harvestResources = function() {

        var resourcesIncome = new ResourcesState();
        for (var i = 0; i < this.NUM_TOWNS; i++) {
            var town = this.neighbourTowns[i];
            resourcesIncome.add(town.harvestResources());
        }
        this.playerState.resources.add(resourcesIncome);
        this.playerState.resourceTrend = resourcesIncome;
    };


    this.harvestNeighbourTownEvents = function() {

        var events = new ResourcesState();
        for (var i = 0; i < this.NUM_TOWNS; i++) {
            var town = this.neighbourTowns[i];
            events.concat(town.harvestNeighbourTownEvents());
        }
        //this.playerState.resources.add(resourcesIncome);
    };


    this.handleNeighbourTownEvents = function() {
        for (var event; event = this.neighbourTownEvents.pop();) {
            this.neighbourTownEffectQueue.addArray(event.getNeighbourTownEffects(this.neighbourTowns))
        }

    };


    this.applyNeighbourTownEffects = function() {
        for (var effect; effect = this.neighbourTownEffectQueue.getEntry();) {
            var targetTown = this.neighbourTowns[effect.townId];
            targetTown.applyEffect(effect);
        }
    };

    this.updateBuildings = function(delta) {

    }
};

GameLogic.makeGameLogic = function() {
    var gameLogic = new GameLogic();
    gameLogic.init();
    return gameLogic;

};

