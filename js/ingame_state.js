function IngameState() {

    this.camVerticalAngle;
    this.camHorizontalAngle;
    this.camZoom;

    this.drawableMap;


    this.init = function() {

        s = new THREE.Scene();
        cam = new Camera();
        cam.initPerspectiveCamera(75, 1.0, 1000.0);

        this.camVerticalAngle = toRad(30);
        this.camHorizontalAngle = toRad(45);
        this.camZoom = 7.0;
        this.moveCamera();

        gameLogic = GameLogic.makeGameLogic();

        gui = new Gui();
        gui.init();
    };


    this.debugShow = function() {
        var effect = new NeighbourTownEffect();
        effect.townId = 1;
        effect.productivityDelta = 10;
        gameLogic.neighbourTownEffectQueue.add(effect);
        var event = new NeighbourTownEvent();
        event.init(1);
        gameLogic.neighbourTownEvents.push(event);

        var tiles = gameLogic.map.getTilesForRadius(2);

        var building = gameLogic.town.addBuilding(BuildingCodes.FARM, tiles[1]);
        var building = gameLogic.town.addBuilding(BuildingCodes.HOUSE, tiles[2]);
        var building = gameLogic.town.addBuilding(BuildingCodes.STEAM_PLANT, tiles[3]);
        var building = gameLogic.town.addBuilding(BuildingCodes.FACTORY, tiles[0]);
        var building = gameLogic.town.addBuilding(BuildingCodes.MINI_LOV, tiles[4]);
        var building = gameLogic.town.addBuilding(BuildingCodes.MINI_TRU, tiles[5]);
        var building = gameLogic.town.addBuilding(BuildingCodes.CANON, tiles[6]);
    };


    this.show = function() {

        renderer.setClearColor(0xffffff);

        gameLogic = GameLogic.makeGameLogic();
        
        this.drawableMap = DrawableMap.makeDrawableMap(gameLogic.map);
        var centerTile = gameLogic.map.getTile(6,6);
        building = gameLogic.town.addBuilding(BuildingCodes.TOWER, centerTile);
        this.debugShow();

        var ambientLight = new THREE.AmbientLight(0x444444);
        s.add(ambientLight);

        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0.5, 0.8, -0.2).normalize();

        light.castShadow = true;

        // light.shadowCameraVisible = true; DEBUG shadow

        light.shadowCameraNear = -5;
        light.shadowCameraFar = 20;

        light.shadowCameraLeft = -15;
        light.shadowCameraRight = 15;
        light.shadowCameraTop = 15;
        light.shadowCameraBottom = -15;
        
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;

        s.add(light);

        gui.show();

        //jQuery("#overlay_event").show();
    };


    this.hide = function() {
        gui.hide();
    };

    this.timeForRadius = 9;
    this.tileCounter = 0;
    this.debugUpdate = function(delta) {
        this.timeForRadius += timer.delta;
        if (this.timeForRadius > 1) {
            this.timeForRadius = 0;
            gameLogic.map.increaseCurrentRadius();
            if (this.tileCounter <= 6) {
                var tile = gameLogic.map.getTilesForRadius(2)[this.tileCounter + 1];
            }
        }
    };


    this.update = function() {

        if(mouse.dragging && mouse.draggingMode == "camera" && (mouse.dragDeltaX != 0 || mouse.dragDeltaY != 0)) {
            this.moveCamera();
        }

        this.drawableMap.update();
        gameLogic.update(timer.delta);
        this.debugUpdate();
        
        gui.update();
    };


    this.moveCamera = function() {

        this.camHorizontalAngle += mouse.dragDeltaX * toRad(0.2);
        this.camVerticalAngle += mouse.dragDeltaY * toRad(0.2);

        if (this.camHorizontalAngle > toRad(180)) {
            this.camHorizontalAngle -= toRad(360);
        } else if (this.camHorizontalAngle < toRad(-180)) {
            this.camHorizontalAngle += toRad(360);
        }
        if (this.camVerticalAngle > toRad(89)) {
            this.camVerticalAngle = toRad(89);
        } else if (this.camVerticalAngle < toRad(15)) {
            this.camVerticalAngle = toRad(15);
        }

        var camX = this.camZoom * Math.cos(this.camVerticalAngle) * Math.cos(this.camHorizontalAngle);
        var camY = this.camZoom * Math.sin(this.camVerticalAngle);
        var camZ = this.camZoom * Math.cos(this.camVerticalAngle) * Math.sin(this.camHorizontalAngle);

        cam.setPosition(camX, camY, camZ);
        cam.lookAt(0, -2, 0);
    };


    this.draw = function() {
        renderer.render(s, cam);
    };


    this.resize = function() {
        cam.setAspectRatio(game.WIDTH / game.HEIGHT);
        gui.resize();
    };

}
