function IngameState() {

  this.cube;
  this.stats;
  this.gameLogic;
  this.drawableMap;

  this.lookAtX = 0.0;


  this.init = function() {

    s = new THREE.Scene();
    cam = new Camera();
    cam.initPerspectiveCamera(75, 1.0, 1000.0);
    //cam.initIsometricCamera(20.0, 0.5, 1.0, 1000.0);
    //cam.initOrthographicCamera(200.0, 1.0, 1000.0);

  };


  this.debugShow = function() {
    var effect = new NeighbourTownEffect();
    effect.townId = 1;
    effect.productivityDelta = 10;
    this.gameLogic.neighbourTownEffectQueue.add(effect);
    var event = new NeighbourTownEvent();
    event.init(1);
    this.gameLogic.neighbourTownEvents.push(event);
  };


  this.show = function() {
    
    renderer.setClearColor(0xffffff);

    this.gameLogic = GameLogic.makeGameLogic();
    this.drawableMap = DrawableMap.makeDrawableMap(this.gameLogic.map);
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

    cam.setPosition(5.0, 5.0, 5.0);
    cam.lookAt(0.0, 0.0, 0.0);
  };

  this.timeForRadius = 9;
  this.debugUpdate = function(delta){
    this.timeForRadius += timer.delta;
    if(this.timeForRadius > 10){
      this.timeForRadius = 0;
      this.gameLogic.map.increaseCurrentRadius();
    }
    else {

    }

    this.gameLogic.update(timer.delta);

  };

  this.update = function() {
    //this.lookAtX += 0.3 * timer.delta;
    this.drawableMap.update(0.1);
    this.gameLogic.update(timer.delta);
    this.debugUpdate()

    var results = cam.getObjectsAtCoords(mouse.x, mouse.y, s.children);
    //console.log(mouse.x, mouse.y);
    if(results.length > 0) {
      this.moveCamera(mouse.x);
      //console.log(mouse.x, mouse.y);
      //console.log(mouse.x, mouse.y, results[0]);
    }
  };

  this.moveCamera = function(distance) {
    cam.threeJSCamera.rotation.x += 1.1;
    //currentPosition = cam.threeJSCamera;
    //currentPosition.setRotation(1,2,3,0);
    //currentPosition.rotation.z += 0.01;

  }
  
  
  this.draw = function() {
    cam.lookAt(this.lookAtX, 0.0);
    renderer.render(s, cam);
  };
  
}