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
    ATTACK_INTERVAL: 1
}

function NeighbourTown() {
	
	this.TITLES = [
		"Zylphia, City of Water",
		"Leander, City of Sand",
		"Cephas, City of the Sky",
		"Okami, City of Wood",
		"Morax, City of Hills",
		"Nelly, City of Fire"
	];
	
	
	this.IMAGES = [
	       		{ x : 0, y : 3 },
	       		{ x : 1, y : 0 },
	       		{ x : 2, y : 3 },
	       		{ x : 3, y : 4 },
	       		{ x : 4, y : 2 },
	       		{ x : 5, y : 4 },
	 ];
	
	
	
    this.townId;

    this.resourcesPool;
    this.attackPool = [];
    this.eventPool = [];
    this.state;

    this.resourcesProductionStrategy;
    this.attackProductionStrategy;
    this.eventProductionStrategy;
    
    this.drawableNeighbourTown;

    this.init = function(townId) {
    	
    	this.townId = townId;
    	
        this.resoucresPool = new ResourcesState();
        this.attackPool = [];
        this.eventPool = [];
        this.state = new NeighbourTownState();

        this.resourcesProductionStrategy = new ResourcesProductionStrategy();
        this.attackProductionStrategy = new AttackProductionStrategy();
        this.eventProductionStrategy = new NeighbourTownEventProductionStrategy();

        this.drawableNeighbourTown = new DrawableNeighbourTown();
        this.drawableNeighbourTown.init(this);
    };
    
    
    this.getTitle = function() {
    	return this.TITLES[this.townId];
    };
    
    
    this.getDescription = function() {
    	
    };
    
    
    this.getImageOffset = function() {
    	return this.IMAGES[this.townId];
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


};


function AttackProductionStrategy() {
    this.timer = 0;
    this.nextAttackTime = 5;
    this.angerFactor = 0;
    this.angerFactorChangeFactor = 0;
    this.attack_interval_mean = 0;
    this.attack_interval_variance = 0;
    this.attack_repository = [];


    this.update = function(neighbourTown, timeDelta){
        var delta = 0;

        if(neighbourTown)
        neighbourTown.state.happyness -= delta;

    };


    this.produce = function(neighbourTown, timeDelta) {
        this.timer += timeDelta;
        if (this.timer >= NeighbourTownConfiguration.ATTACK_INTERVAL) {
            this.timer -= NeighbourTownConfiguration.ATTACK_INTERVAL;
            //this.timer = NeighbourTownConfiguration.;
            //return = [];
        }
    };

    this.getAttackProbability = function(){
    }
}

AttackProductionStrategy.make = function(increaseRate, decreaseRate) {
    var strategy = new AttackProductionStrategy();
    strategy.increaseRate = increaseRate;
    strategy.decreaseRate = decreaseRate;
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
        AttackProductionStrategy.make(0.05, 0.01),
        AttackProductionStrategy.make(0.04, 0.02),
        AttackProductionStrategy.make(0.02, 0.1),
        AttackProductionStrategy.make(0.01, 0.1),
        AttackProductionStrategy.make(0.05, 0.1),
        AttackProductionStrategy.make(0.05, 0.2)
    ];
    this.makeNeighbourTown = function(number) {
    }
}

var NeighbourTownFactory = new NeighbourTownFactoryPrototype();
//NeighbourTownFactory.init()


function DrawableNeighbourTown() {
	
    this.TILE_HEIGHT = 0.15;
    this.TILE_SIZE = 1.5;
	
    this.FLOATING_ANIMATION_SPEED = 0.6;
    this.DISTANCE_FROM_TOWER = 6;
	
	this.neighbourTown;
	this.townId;
	
	this.x;
	this.z;

	this.node;
	
    this.colorH;
    this.colorS;
    this.colorL;
    
    this.tileModel;
	
	
	this.init = function(neighbourTown) {
		
		this.neighbourTown = neighbourTown;
		this.townId = this.neighbourTown.townId;
		
		this.x = Math.sin(this.townId * toRad(60)) * this.DISTANCE_FROM_TOWER;
		this.z = Math.cos(this.townId * toRad(60)) * this.DISTANCE_FROM_TOWER;
		
		this.node = new THREE.Object3D();
	    this.node.position.set(this.x, -0.8, this.z);
	    this.node.rotation.set(0, toRad(30), 0);
	    
		this.colorH = randFloat(0.075, 0.095);
		this.colorS = randFloat(0.2, 0.3);
		this.colorL = randFloat(0.35, 0.55);
	    
	    this.createTileModel();
	    this.createBuildings();
	};
	
	
	this.createTileModel = function() {
		
	      var geometry = Shapes3D.makeHexagonVolume(this.TILE_SIZE, -this.TILE_HEIGHT, 0);
	      
	      var color = HSLtoHex(this.colorH, this.colorS, this.colorL);
	      var material = new THREE.MeshLambertMaterial({ color : color, ambient : color });
	      
	      this.tileModel = new THREE.Mesh(geometry, material);
	      this.tileModel.userData = { neighbourTown : this.townId };
	      this.tileModel.castShadow = true;
	      this.tileModel.receiveShadow = true;
	      this.tileModel.frustumCulled = false; // prevents errors while generating shadows
	      
	      this.node.add(this.tileModel);
	};
	
	
	this.createBuildings = function() {
		
	};
	
	
    this.showSelection = function(r, g, b) {
    	var tileModelColor = this.tileModel.material.color;
    	var rgb = HSLtoRGB(this.colorH, 1.0, this.colorL);
    	var hex = RGBtoHex(
    			Math.round((rgb.r + r) / 2),
    			Math.round((rgb.g + g) / 2),
    			Math.round((rgb.b + b) / 2)
    	);
    	tileModelColor.setHex(hex);
    };
    
    
    this.hideSelection = function() {
    	var tileModelColor = this.tileModel.material.color;
    	tileModelColor.setHex(HSLtoHex(this.colorH, this.colorS, this.colorL));
    };
	
}


