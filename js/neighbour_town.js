/**
 * Created by janmeier on 23.01.15.
 */

var NeighbourTownConfiguration = {
    RESOURCES_PRODUCTION_INTERVAL: 1.0, // minutes
    COAL_PRODUCTION_MIN: 1,
    COAL_PRODUCTION_MAX: 5,
    COAL_PRODUCTION_LEVEL: 5,
    IRON_PRODUCTION_MIN: 1,
    IRON_PRODUCTION_MAX: 5,
    PRODUCTIVITY_LEVEL_MIN: 0,
    PRODUCTIVITY_LEVEL_MAX: 1.0,
    HAPPYNES_LEVEL_MIN: 0.0,
    HAPPYNES_LEVEL_MAX: 1.0,
    MIN_ATTACK_INTERVAL: 0, // per minute
    MAX_ATTACK_INTERVAL: 1
}

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
    this.productivity = 1;
    this.happyness = 0.5;
    this.coalTaxes = 0.0;
    this.ironTaxes = 0.0;
}


function ResourcesProductionStrategy() {
    this.timer = 0;
    this.coal_production_factor = 1.0;
    this.iron_production_factor = 1.0;

    this.produce = function(neighbourTown, timeDelta) {
        var result = new ResourcesState();
        this.timer += timeDelta;
        if (this.timer >= NeighbourTownConfiguration.RESOURCES_PRODUCTION_INTERVAL) {
            this.timer -= NeighbourTownConfiguration.RESOURCES_PRODUCTION_INTERVAL;

            result.coal += (NeighbourTownConfiguration.COAL_PRODUCTION_MAX - NeighbourTownConfiguration.COAL_PRODUCTION_MIN) * this.coal_production_factor * neighbourTown.state.productivity;
            result.iron += (NeighbourTownConfiguration.IRON_PRODUCTION_MAX - NeighbourTownConfiguration.IRON_PRODUCTION_MIN) * this.iron_production_factor * neighbourTown.state.productivity;

        }

        return result;
    }
}
ResourcesProductionStrategy.make = function(coalFactor, ironFactor) {
    var strategy = new ResourcesProductionStrategy();
    strategy.coal_production_factor = coalFactor;
    strategy.iron_production_factor = ironFactor;


}


function AttackProductionStrategy() {
    this.timer = 0;
    this.nextAttackTime = 5;
    this.attack_interval_mean = 0;
    this.attack_interval_variance = 0;
    this.attack_repository = [];

    this.produce = function(neighbourTown, timeDelta) {
        this.timer += timeDelta;
        if (this.timer >= this.nextAttackTime) {
            //this.timer = NeighbourTownConfiguration.;
            //return = [];
        }
    }
}

AttackProductionStrategy.make = function(interval, variance) {
    var strategy = new AttackProductionStrategy();
    strategy.attack_interval_mean = interval;
    strategy.attack_interval_variance = variance;
    return strategy;

}

function NeighbourTownEventProductionStrategy() {
    this.produce = function(neighbourTown, delta) {
        /*
         Returns an array of events
         */
        return [];
    }
}

NeighbourTownEventProductionStrategy.make = function() {

}


function NeighbourTownEffect() {
    this.targetTown;

    this.productivityDelta = 0;
    this.productivityFactor = 1;
    this.happynessDelta = 0;
    this.happynessFactor = 1;

    this.apply = function(town) {
        town.state.productivity *= this.productivityFactor;
        town.state.productivity += this.productivityDelta;

        town.state.happyness *= this.happynessFactor;
        town.state.happyness += this.happynessDelta;

        this.applySideEffect(town);

    };

    this.init = function(productivityDelta, productivityFactor, happynessDelta, happynessFactor) {
        this.productivityDelta = productivityDelta;
        this.productivityFactor = productivityFactor;
        this.happynessDelta = happynessDelta;
        this.happynessFactor = happynessFactor;
    };

    this.applySideEffect = function(town) {
        // Do something
    }
}

NeighbourTownEffect.make = function(productivityDelta, productivityFactor, happynessDelta, happynessFactor) {
    var result = new NeighbourTownEffect()
    result.init(productivityDelta, productivityFactor, happynessDelta, happynessFactor)
    return result
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


function NeighbourTownFactoryPrototype() {

    this.production_strategy = [
        ResourcesProductionStrategy.make(1.0, 1.0),
        ResourcesProductionStrategy.make(1.0, 1.0),
        ResourcesProductionStrategy.make(0.7, 0.7),
        ResourcesProductionStrategy.make(0.7, 0.7),
        ResourcesProductionStrategy.make(0.5, 0.5),
        ResourcesProductionStrategy.make(0.5, 0.5),
    ];

    this.attack_strategy = [
        AttackProductionStrategy.make(1),
        AttackProductionStrategy.make(0.7),
        AttackProductionStrategy.make(0.6),
        AttackProductionStrategy.make(0.5),
        AttackProductionStrategy.make(0.4),
        AttackProductionStrategy.make(0.4),
    ];
    this.makeNeighbourTown = function(number) {
    }
}

var NeighbourTownFactory = new NeighbourTownFactoryPrototype();
//NeighbourTownFactory.init()


