function GameLogic() {

    this.NUM_TOWNS = 6;

    this.TOWN_EVENT_MEAN_INTERVAL = 10;
    this.TOWN_EVENT_VARIANCE = 5;
    this.townEventTimer = 0;

    this.playerState;

    this.map;

    this.neighbourTownsNode;
    this.neighbourTowns;
    this.neighbourTownEffectQueue;
    this.neighbourTownEvents;

    this.town;

    this.assembler;

    this.minLovEventManager;
    this.minTruEventManager;

    this.init = function() {

        this.playerState = new PlayerState();
        this.playerState.init();

        this.map = new Map();
        this.map.init(6);

        this.neighbourTownsNode = new THREE.Object3D();
        s.add(this.neighbourTownsNode);

        this.neighbourTownEffectQueue = new NeighbourTownEffectQueue();
        this.neighbourTownEvents = [];
        this.initNeighbourCities();

        this.town = Town.make(this.map);
        this.town.addTower();

        this.assembler = new Assembler();
        this.assembler.init();

        this.minLovEventManager = MinLovEventManager.make(this.town);
        this.minTruEventManager = MinTruEventManager.make(this.town);
    };


    this.initNeighbourCities = function() {
        this.neighbourTowns = [];
        for (var i = 0; i < this.NUM_TOWNS; i++) {
            var neighbourTown = new NeighbourTown();
            neighbourTown.init(i);
            this.neighbourTowns.push(neighbourTown);
            this.neighbourTownsNode.add(neighbourTown.drawableNeighbourTown.node);
        }
    };


    this.neighbourTownMouseSelect = function() {
        var results = cam.getObjectsAtCoords(mouse.x, mouse.y, this.neighbourTownsNode.children);
        if (results.length > 0) {
            var index = results[0].object.userData.neighbourTown;
            gui.setSelectedNeighbourTown(this.neighbourTowns[index]);
        } else {
            gui.setSelectedNeighbourTown(null);
        }
    };


    this.neighbourTownMouseDeselect = function() {
        gui.setSelectedNeighbourTown(null);
    };


    this.update = function() {

        this.map.update();

        this.updateNeighbours(timer.delta);
        this.harvestResources();
        this.handleNeighbourTownEvents();
        this.applyNeighbourTownEffects();
        this.updateTownEvents(timer.delta);
        this.town.update(timer.delta, this.playerState);
        var minLovResult = this.minLovEventManager.update(timer.delta, this.town);
        if (minLovResult) {
            gui.overlay.openNeighbourEvent(
                minLovResult.name,
                minLovResult.text,
                Overlay.STYRO_MAD,
                minLovResult.getEffect().getCallback()
            );
        }
        var minTruResult = this.minTruEventManager.update(timer.delta, this.town);
        if (minTruResult) {
            gui.overlay.openNeighbourEvent(
                minTruResult.name,
                minTruResult.text,
                Overlay.STYRO_MAD,
                minTruResult.getEffect().getCallback()
            );

        }

        this.playerState.applyTrends();
    };


    this.updateTownEvents = function(delta) {
        this.townEventTimer += delta;

        if (this.townEventTimer > this.TOWN_EVENT_MEAN_INTERVAL) {
            this.townEventTimer -= this.TOWN_EVENT_MEAN_INTERVAL;
            this.townEventTimer += (Math.random() - 0.5) * this.TOWN_EVENT_VARIANCE;

            var event = TownEvents.getRandomEventForLevel(1);
            gui.overlay.openEvent(
                event.title,
                event.description,
                Overlay.STYRO_MAD,
                event.action
            );
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

