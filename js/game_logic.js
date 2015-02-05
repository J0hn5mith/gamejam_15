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

        this.minLovEventManager = MinLovEventManager.make();
        this.minTruEventManager = MinTruEventManager.make();
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
        this.updateTownEvents(timeDelta);
        this.town.update(timeDelta, this.playerState);
        var minLovEvent = this.minLovEventManager.update(timeDelta, this.town);
        if (minLovEvent) {
            //var overlay = jQuery('#overlay-hello')[0];
            //var id = '#' + overlay;
            //jQuery(overlay).addClass('overlay-open');
            //jQuery('body').addClass('overlay-view');
            //var button = jQuery('#overlay-option-button-1')[0];
            //overlay.innerHTML = '<ol><li>html data</li></ol>';
            //button.onclick = function() {
            minLovEvent.action(1)
            //};
            var i = 10;
        }
        var minTruEvent = this.minTruEventManager.update(timeDelta, this.town);
        if (minTruEvent) {
            var i = 10;
            minTruEvent.action(1)
        }

        this.playerState.applyTrends();
    };

    this.townEventTimer = 0;
    this.TOWN_EVENT_MEAN_INTERVAL = 10;
    this.TOWN_EVENT_VARIANCE = 5;

    this.updateTownEvents = function(delta) {
        this.townEventTimer += delta;

        if (this.townEventTimer > this.TOWN_EVENT_MEAN_INTERVAL) {
            this.townEventTimer -= this.TOWN_EVENT_MEAN_INTERVAL;
            this.townEventTimer += (Math.random() - 0.5) * this.TOWN_EVENT_VARIANCE;

            var event = TownEvents.getRandomEventForLevel(1);
            event.action();
        }
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

};

GameLogic.makeGameLogic = function() {
    var gameLogic = new GameLogic();
    gameLogic.init();
    return gameLogic;

};

