var gameLogic =
function IngameState() {

  this.cube;
  this.stats;

  this.lookAtX = 0.0;


  this.init = function() {

    s = new THREE.Scene();

    cam = new Camera();
    cam.initPerspectiveCamera(75, 1.0, 1000.0);
    //cam.initIsometricCamera(20.0, 0.5, 1.0, 1000.0);
    //cam.initOrthographicCamera(200.0, 1.0, 1000.0);
  };

  this.createGameLogic = function(){
    gameLogic = new GameLogic();
    this.drawableMap = new DrawableMap();
    this.drawableMap.init(this.gameLogic.map, s);
  };
  
  
  this.show = function() {

    var ambientLight = new THREE.AmbientLight(0x333333);
    s.add(ambientLight);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0.5, 0.5, 0.0).normalize();

    light.castShadow = true;

    light.shadowCameraVisible = true;

    light.shadowCameraNear = -5;
    light.shadowCameraFar = 25;

    light.shadowCameraLeft = -10;
    light.shadowCameraRight = 10;
    light.shadowCameraTop = 10;
    light.shadowCameraBottom = -10;

    s.add(light);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    this.cube = new THREE.Mesh(geometry, img.material("test"));
    this.cube.castShadow = true;
    s.add(this.cube);

    var geometry2 = new THREE.BoxGeometry(8, 1, 8);
    var cube2 = new THREE.Mesh(geometry2, img.material("test3"));
    cube2.receiveShadow = true;
    cube2.position.set(0, -1, 0);
    s.add(cube2);

    cam.setPosition(5.0, 5.0, 5.0);
    cam.lookAt(0.0, 0.0, 0.0);
  };


  this.update = function() {
    this.cube.rotation.y += 1.5 * timer.delta;
    //this.lookAtX += 0.3 * timer.delta;
    //this.drawableMap.update(0.1)
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