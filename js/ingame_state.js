function IngameState() {

    this.camVerticalAngle;
    this.camHorizontalAngle;
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


    this.show = function() {

        renderer.setClearColor(0xffffff);

        gameLogic = GameLogic.makeGameLogic();
        
        this.drawableMap = DrawableMap.makeDrawableMap(gameLogic.map);
        gameLogic.town.addTower();

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

    this.update = function() {
        
        if(!this.blockMapInteraction) {
            
            if(mouse.dragging && mouse.draggingMode == "camera" && (mouse.dragDeltaX != 0 || mouse.dragDeltaY != 0)) {
                this.camHorizontalAngle += mouse.dragDeltaX * toRad(0.2);
                this.camVerticalAngle += mouse.dragDeltaY * toRad(0.2);
                this.updateCamera();
            }
            
            if((keyboard.isPressed(Keyboard.ARROW_LEFT) || keyboard.isPressed(Keyboard.A)) &&
                    !keyboard.isPressed(Keyboard.ARROW_RIGHT) && !keyboard.isPressed(Keyboard.D)) {
                this.camHorizontalAngle += toRad(60.0) * timer.delta;
                this.updateCamera();
            }
            if((keyboard.isPressed(Keyboard.ARROW_RIGHT) || keyboard.isPressed(Keyboard.D)) &&
                    !keyboard.isPressed(Keyboard.ARROW_LEFT) && !keyboard.isPressed(Keyboard.A)) {
                this.camHorizontalAngle -= toRad(60.0) * timer.delta;
                this.updateCamera();
            }
            if((keyboard.isPressed(Keyboard.ARROW_UP) || keyboard.isPressed(Keyboard.W)) &&
                    !keyboard.isPressed(Keyboard.ARROW_DOWN) && !keyboard.isPressed(Keyboard.S)) {
                this.camVerticalAngle += toRad(60.0) * timer.delta;
                this.updateCamera();
            }
            if((keyboard.isPressed(Keyboard.ARROW_DOWN) || keyboard.isPressed(Keyboard.S)) &&
                    !keyboard.isPressed(Keyboard.ARROW_UP) && !keyboard.isPressed(Keyboard.W)) {
                this.camVerticalAngle -= toRad(60.0) * timer.delta;
                this.updateCamera();
            }
            
            this.drawableMap.mouseSelect();
        } else {
            this.drawableMap.mouseDeselect();
        }
        
        if(!this.paused) {
            this.drawableMap.update();
            gameLogic.update(timer.delta);

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
