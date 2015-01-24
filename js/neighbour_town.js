/**
 * Created by janmeier on 23.01.15.
 */


function NeighbourTown() {
    this.townId;

    this.resourcesPool;
    this.attackPool = [];
    this.eventPool = [];
    this.state;

    this.resourcesProductionStrategy;
    this.attackProductionStrategy;
    this.eventProductionStrategy;

    this.init = function() {
        this.resoucresPool = new ResourcesState();
        this.attackPool = [];
        this.eventPool = [];
        this.state = new NeighbourTownState();

        this.resourcesProductionStrategy = new ResourcesProductionStrategy();
        this.attackProductionStrategy = new AttackProductionStrategy();
        this.eventProductionStrategy = new NeighbourTownEventProductionStrategy();

    };


    this.update = function(delta) {
        this.produceResources(delta);
        this.produceAttacks(delta);
        this.produceEvents(delta);
    };


    this.produceResources = function(delta) {
        var result = this.resourcesProductionStrategy.produce(this, delta);
        this.resoucresPool.add(result);
    };


    this.produceAttacks = function(delta) {
        var result = this.attackProductionStrategy.produce(this, delta);
        this.attackPool.concat(result)

    };


    this.produceEvents = function(delta) {
        var result = this.eventProductionStrategy.produce(this, delta);
        this.eventPool.concat(result)

    };


    this.harvestResources = function(delta) {
        returnValue = jQuery.extend(true, {}, this.resoucresPool);
        this.resoucresPool = new ResourcesState();
        return returnValue;
    };


    this.harvestAttacks = function(delta) {
        returnValue = this.attackPool.slice();
        this.attackPool = [];
        return returnValue;

    };

    this.harvestEvents = function(delta) {
        returnValue = this.eventPool.slice();
        this.eventPool = [];
        return returnValue;

    };

    this.applyEffect = function(effect) {
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
    this.produce = function(neighbourTown, delta) {
        var result = new ResourcesState();
        return result;
    }

}


function AttackProductionStrategy() {
    this.produce = function(neighbourTown, delta) {
        return [];

    }
}

function NeighbourTownEventProductionStrategy() {
    this.produce = function(neighbourTown, delta) {
        /*
            Returns an array of events
         */
        return [];
    }
}


function NeighbourTownEffect() {
    this.targetTown;

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

    this.effects = [];

    this.add = function(effect) {
        this.effects.push(effect);

    };

    this.addArray = function(effectArray) {
        this.effects.concat(effectArray);


    };

    this.getEntry = function() {
        // Returns entry and null if there is no further entry
        if (this.effects.length > 0) {
            return this.effects.pop()
        }
        else {
            return false
        }
    };

}


function NeighbourTownEvent() {
    this.townId;

    this.init = function(townId) {
        this.townId = townId;
    };

    this.getNeighbourTownEffects = function(neighbourTownArray) {
        // Return array of effects
        return [];
    };
}

