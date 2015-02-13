function IngameState() {
    
	this.cameraController;
    
    this.paused = false;
    this.blockMapInteraction = false;


    this.init = function() {

        s = new THREE.Scene();
        cam = new Camera();
        cam.initPerspectiveCamera(75, 0.1, 100.0);
        
        this.cameraController = new CameraController();
        this.cameraController.init();
        
        gameLogic = new GameLogic();
        gameLogic.init();

        gui = new Gui();
        gui.init();
    };


    this.show = function() {

        renderer.setClearColor(0xffffff);

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
        	this.cameraController.mouseAndKeyboardInput();            
            gameLogic.map.drawableMap.mouseSelect();
            gameLogic.neighbourTownMouseSelect();
            
        } else {
        	gameLogic.map.drawableMap.mouseDeselect();
        	gameLogic.neighbourTownMouseDeselect();
        }
        
        if(!this.paused) {
            gameLogic.update();
            gui.update();
        }
    };


    this.draw = function() {
        renderer.render(s, cam);
    };


    this.resize = function() {
        cam.setAspectRatio(game.WIDTH / game.HEIGHT);
        gui.resize();
    };

}
