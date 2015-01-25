function IngameState() {

    this.camVerticalAngle;
    this.camHorizontalAngle;
    this.camZoom;

    this.drawableMap;


    this.init = function() {

        s = new THREE.Scene();
        cam = new Camera();
        cam.initPerspectiveCamera(75, 1.0, 1000.0);

        this.camVerticalAngle = toRad(15);
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
    };


    this.show = function() {

        renderer.setClearColor(0xffffff);

        gameLogic = GameLogic.makeGameLogic();
        this.drawableMap = DrawableMap.makeDrawableMap(gameLogic.map);
        this.debugShow();

        var ambientLight = new THREE.AmbientLight(0x333333);
        s.add(ambientLight);

        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0.5, 0.5, 0.0).normalize();

        light.castShadow = true;

        light.shadowCameraVisible = false;

        light.shadowCameraNear = -5;
        light.shadowCameraFar = 25;

        light.shadowCameraLeft = -10;
        light.shadowCameraRight = 10;
        light.shadowCameraTop = 10;
        light.shadowCameraBottom = -10;

        s.add(light);

        gui.show();
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
                var building = gameLogic.town.addBuilding(this.tileCounter, tile);
                var buff = BuildingBuff.make(10);
                buff.assignToBuilding(building);
                this.tileCounter++;
            }
        }
    };


    this.update = function() {

        if(mouse.dragging && mouse.draggingMode == "camera" && (mouse.dragDeltaX != 0 || mouse.dragDeltaY != 0)) {
            this.moveCamera();
        }

        this.drawableMap.update(timer.delta);
        gameLogic.update(timer.delta);
        this.debugUpdate();
        if(gui){
            gui.updateResources();
            gui.updateComponents();
        }

        /*var results = cam.getObjectsAtCoords(mouse.x, mouse.y, s.children);
         if(results.length > 0) {
         }*/
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
        } else if (this.camVerticalAngle < toRad(-920)) {
            this.camVerticalAngle = toRad(-920);
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
        jQuery("#gui").width(game.WIDTH).height(game.HEIGHT);
        jQuery("#assembly_panel").css("left", ((game.WIDTH / 2.0) - 150) + "px");
    };

}
