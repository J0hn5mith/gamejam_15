/**
 * Created by janmeier on 23.01.15.
 */


function NeighbourTown() {
    this.resourcesPool;
    this.attackPool = [];
    this.state;

    this.resourcesProductionStrategy;
    this.attackProductionStrategy;

    this.init = function(){
        this.resoucresPool = new ResourcesState();
        this.attackPool = [];

        this.resourcesProductionStrategy = new ResourcesProductionStrategy();
        this.attackProductionStrategy = new AttackProductionStrategy();

    };


    this.update = function(delta){
        this.produceResources(delta);
        this.produceAttacks(delta);
    };


    this.produceResources = function (delta) {
        var result = this.resourcesProductionStrategy.produce(this, delta);
        this.resoucresPool.add(result);
    };


    this.produceAttacks = function (delta) {
        var result = this.attackProductionStrategy.produce(this, delta);
        this.attackPool.concat(result)

    };


    this.harvestResources = function (delta) {
        returnValue = jQuery.extend(true, {}, this.resoucresPool);
        this.resoucresPool = new ResourcesState();
        return returnValue;
    };

    this.harvestAttacks = function (delta) {
        returnValue = this.attackPool.slice();
        this.attackPool = [];
        return returnValue;

    };

    this.applyEffect = function(effect){
        effect.apply(this);
    }

}
NeighbourTown.makeNeighbourTown = function() {
    var neighbourTown = new NeighbourTown();
    neighbourTown.init();
    return neighbourTown;

};

function NeighbourTownState() {
    this.productivity = 0;
    this.happyness = 0;

}


function ResourcesProductionStrategy() {
    this.produce = function(neighbourTown, delta){
        var result = new ResourcesState();
        result.coal = 1;
        return result;
    }

}


function AttackProductionStrategy() {
    this.produce = function(neighbourTown, delta){
        return [];

    }
}


function NeighbourTownEffect() {
    this.productivityDelta = 0;
    this.productivityFactor = 0;
    this.happynessDelta = 0;
    this.happynessFactor = 0;

    this.apply = function(town) {
        town.state.productivity *= this.productivityFactor;
        town.state.productivity += this.productivityDelta;

        town.state.happyness *= this.happynessFactor;
        town.state.happyness += this.happynessDelta;

        this.applySideEffect(town);

    };

    this.applySideEffect = function(town) {
        // Do something

    }
}


function NeighbourTownEffectQueue() {

    this.entries = [];

    this.add  = function(targetTown, effect){
        this.entries.push(NeighbourTownEffectQueueEntry.make(targetTown, effect));

    };

    this.getEntry =  function() {
        // Returns entry and null if there is no further entry
        if(!this.entries.isEmpty()){
           return this.entries.pop()
        }
        else {
           return false
        }
    }

}

function NeighbourTownEffectQueueEntry() {
    this.targetTown = 0;
    this.effect = null;

    this.init = function(targetTown, effect){
        this.targetTown = targetTown;
        this.effect = effect;
    }
}

NeighbourTownEffectQueueEntry.make = function(targetTown, effect){
    var entry =  new NeighbourTownEffectQueueEntry();
    entry.init(targetTown, effect);
    return entry;
}

