function IngameState() {
    
    this.CAM_MAX_SPEED = toRad(60.0);
    this.CAM_ACCELERATION = toRad(720.0);
    this.CAM_DECELERATION = toRad(360.0);

    this.camVerticalAngle;
    this.camHorizontalAngle;
    
    this.camVerticalSpeed = 0.0;
    this.camHorizontalSpeed = 0.0;
    
    this.camZoom;

    this.drawableMap;
    
    this.paused = false;
    this.blockMapInteraction = false;


    this.init = function() {

        s = new THREE.Scene();
        cam = new Camera();
        cam.initPerspectiveCamera(75, 1.0, 1000.0);

        this.camVerticalAngle = toRad(30);
        this.camHorizontalAngle = toRad(45);
        this.camZoom = 7.0;
        this.updateCamera();

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
        
        keyboard.registerKeyUpHandler(Keyboard.P, function() {
            game.state.paused = !game.state.paused;
        });
        keyboard.registerKeyUpHandler(Keyboard.SPACE_BAR, function() {
            game.state.paused = !game.state.paused;
        });

        gui.show();
        
        //DEBUG
        keyboard.registerKeyUpHandler(Keyboard.H, function() {
            gui.overlay.openEvent("Treasure found", "We found a treasure in an abandonned apartment in the old part of town. We just earned four steel. <br /><br />What do we do now?", Overlay.STYRO_DOG_EYES, function() { alert("hallo"); });
        });
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
        
        if(!this.blockMapInteraction) {
            
            if(mouse.dragging && mouse.draggingMode == "camera" && (mouse.dragDeltaX != 0 || mouse.dragDeltaY != 0)) {
                this.camHorizontalAngle += mouse.dragDeltaX * toRad(0.2);
                this.camVerticalAngle += mouse.dragDeltaY * toRad(0.2);
                this.updateCamera();
            }
            
            if((keyboard.isPressed(Keyboard.ARROW_LEFT) || keyboard.isPressed(Keyboard.A)) &&
                    !keyboard.isPressed(Keyboard.ARROW_RIGHT) && !keyboard.isPressed(Keyboard.D)) {
                this.camHorizontalSpeed += this.CAM_ACCELERATION * timer.delta;
                
            } else if((keyboard.isPressed(Keyboard.ARROW_RIGHT) || keyboard.isPressed(Keyboard.D)) &&
                    !keyboard.isPressed(Keyboard.ARROW_LEFT) && !keyboard.isPressed(Keyboard.A)) {
                this.camHorizontalSpeed -= this.CAM_ACCELERATION * timer.delta;
                
            } else {
                if(this.camHorizontalSpeed > 0) {
                    this.camHorizontalSpeed -= this.CAM_DECELERATION * timer.delta;
                    if(this.camHorizontalSpeed < 0) {
                        this.camHorizontalSpeed = 0;
                    }
                } else if(this.camHorizontalSpeed < 0) {
                    this.camHorizontalSpeed += this.CAM_DECELERATION * timer.delta;
                    if(this.camHorizontalSpeed > 0) {
                        this.camHorizontalSpeed = 0;
                    }
                }
            }
            
            if((keyboard.isPressed(Keyboard.ARROW_UP) || keyboard.isPressed(Keyboard.W)) &&
                    !keyboard.isPressed(Keyboard.ARROW_DOWN) && !keyboard.isPressed(Keyboard.S)) {
                this.camVerticalSpeed += this.CAM_ACCELERATION * timer.delta;
                
            } else if((keyboard.isPressed(Keyboard.ARROW_DOWN) || keyboard.isPressed(Keyboard.S)) &&
                    !keyboard.isPressed(Keyboard.ARROW_UP) && !keyboard.isPressed(Keyboard.W)) {
                this.camVerticalSpeed -= this.CAM_ACCELERATION * timer.delta;
            } else {
                if(this.camVerticalSpeed > 0) {
                    this.camVerticalSpeed -= this.CAM_DECELERATION * timer.delta;
                    if(this.camVerticalSpeed < 0) {
                        this.camVerticalSpeed = 0;
                    }
                } else if(this.camVerticalSpeed < 0) {
                    this.camVerticalSpeed += this.CAM_DECELERATION * timer.delta;
                    if(this.camVerticalSpeed > 0) {
                        this.camVerticalSpeed = 0;
                    }
                }
            }
            
            if(this.camHorizontalSpeed != 0.0 || this.camVerticalSpeed != 0.0) {
                this.camHorizontalSpeed = limit(this.camHorizontalSpeed, -this.CAM_MAX_SPEED, this.CAM_MAX_SPEED);
                this.camVerticalSpeed = limit(this.camVerticalSpeed, -this.CAM_MAX_SPEED, this.CAM_MAX_SPEED);
                this.camHorizontalAngle += this.camHorizontalSpeed * timer.delta;
                this.camVerticalAngle += this.camVerticalSpeed * timer.delta;
                this.updateCamera();
            }

            
            this.drawableMap.mouseSelect();
        } else {
            this.drawableMap.mouseDeselect();
        }
        
        if(!this.paused) {
            this.drawableMap.update();
            gameLogic.update(timer.delta);
            this.debugUpdate();
            
            gui.update();
        }
    };


    this.updateCamera = function() {

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
