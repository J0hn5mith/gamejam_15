/**
 *
 * Created by janmeier on 19.01.15.
 */

function Position2D() {
    this.x = 0;
    this.y = 0;

    this.init = function(x, y) {
        this.x = x;
        this.y = y;
    };

    this.getZ = function() {
        return -(this.x - this.y);

    }
}


Position2D.makePosition = function(x, y) {
    var position = new Position2D();
    position.init(x, y);
    return position;
};


Position2D.Origin = Position2D.makePosition(0, 0);


function Vector3D() {
    this.x = 0;
    this.y = 0;
    this.z = 0;


    this.init = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };

    
    this.isOrthogonalToBaseVector = function() {
        return this.x == 0 || this.y == 0 || this.z == 0;
    };

}


Vector3D.makeVector = function(x, y, z) {
    var vector = new Vector3D();
    vector.init(x, y, z);
    return vector;
}


function Tile() {
	
	this.map;
  
    this.position;
    
    this.building;


    this.init = function(x, y, map) {
        this.map = map;
        this.building = null;
        this.position = new Position2D();
        this.position.init(x, y)
    };

    
    this.addBuilding = function(building) {
        this.building = building;
    };
    
    
    this.isBuildable = function(assembly) {
    	
    	if(assembly.target == BuildingCodes.ANY) {
            return true;
        
        } else if(assembly.target == BuildingCodes.EMPTY) {
            return this.building == null;
            
        } else if(this.building != null && this.building.code == assembly.target) {
            if(!assembly.hasOwnProperty("levelRequirements")) {
            	return true;
            }
            var requirements = assembly.levelRequirements;
            if(this.building.level >= requirements.min && this.building.level <= requirements.max) {
                return true;
            }
        }
    	return false;
    };
}


function DrawableTile() {
    
    this.TILE_HEIGHT = 0.15;
    this.TILE_SIZE = 0.92;
    
    this.SPAWN_ANIMATION_Y_MIN = -10;
    this.SPAWN_ANIMATION_Y_MAX = -30;
    this.SPAWN_ANIMATION_SPEED = 3.6;
    
    this.FLOATING_ANIMATION_SPEED = 0.6;
    
    this.DISTANCE_TO_TOWER_Y_INFLUENCE = 0.3;

    this.tile;
    this.drawableTileIndex;
    this.orthogonalPosition;
    
    this.colorH;
    this.colorS;
    this.colorL;
    
    this.node;
    this.selectionNode;
    
    this.tileModel;
    this.buildingModel;
    
    this.spawnY;
    this.distanceToTowerY;
    this.floatingAnimationTimer;
    
   
    this.init = function(tile, drawableTileIndex, animateSpawn) {
      this.tile = tile;
      this.drawableTileIndex = drawableTileIndex;
      this.setOrthogonalPosition();
      
      this.node = new THREE.Object3D();
      this.node.position.set(this.orthogonalPosition.x, 0, this.orthogonalPosition.y);
      
      this.colorH = randFloat(0.075, 0.095);
      this.colorS = randFloat(0.2, 0.3);
      this.colorL = randFloat(0.35, 0.55);
      
      this.createTileModel(animateSpawn);
      this.buildingModel = null;
      
      this.spawnY = 0;
      if(animateSpawn) {
          this.spawnY = randFloat(this.SPAWN_ANIMATION_Y_MIN, this.SPAWN_ANIMATION_Y_MAX);
      }
      var distanceToTower = this.tile.map.getDistanceToCenter(this.tile.position) + 1.0;
      this.distanceToTowerY = -Math.sqrt(distanceToTower) * this.DISTANCE_TO_TOWER_Y_INFLUENCE;
      this.floatingAnimationTimer = randFloat(0.0, 6.2832);
    };
    
    
    this.setOrthogonalPosition = function() {
      var x = (this.tile.position.x * 0.866) - (this.tile.position.y * 0.433);
      var y = this.tile.position.y * 0.75;
      var mapRadius = this.tile.map.radius;
      x -= mapRadius * 0.433;
      y -= mapRadius * 0.75;
      this.orthogonalPosition = Position2D.makePosition(x, y);
    };
    
    
    this.createTileModel = function() {

      var geometry = Shapes3D.makeHexagonVolume(this.TILE_SIZE, -this.TILE_HEIGHT, 0);
      
      var color = HSLtoHex(this.colorH, this.colorS, this.colorL);
      var material = new THREE.MeshLambertMaterial({ color : color, ambient : color });
      
      this.tileModel = new THREE.Mesh(geometry, material);
      this.tileModel.userData = { drawableTileIndex : this.drawableTileIndex };
      this.tileModel.castShadow = true;
      this.tileModel.receiveShadow = true;
      this.tileModel.frustumCulled = false; // prevents errors while generating shadows
      
      this.node.add(this.tileModel);
   };


    this.update = function(floatingAmplitude) {

        if(this.spawnY < 0) {
            var velocity = Math.sqrt(Math.abs(this.spawnY)) * this.SPAWN_ANIMATION_SPEED;
            this.spawnY += velocity * timer.delta;
            if(this.spawnY > 0) {
                this.spawnY = 0;
            }
        }
        
        this.floatingAnimationTimer += timer.delta * this.FLOATING_ANIMATION_SPEED;
        if(this.floatingAnimationTimer > 6.2832) {
            this.floatingAnimationTimer -= 6.2832;
        }
        var floatingAnimationY = Math.sin(this.floatingAnimationTimer + this.orthogonalPosition.x);
        floatingAnimationY *= Math.sin(this.floatingAnimationTimer + this.orthogonalPosition.y);
        floatingAnimationY *= Math.sin(this.floatingAnimationTimer + this.orthogonalPosition.y);
        floatingAnimationY *= floatingAmplitude;
        
        this.node.position.setY(this.spawnY + this.distanceToTowerY + floatingAnimationY);
        if(this.selectionNode != null) {
            this.selectionNode.position.copy(this.node.position);
        }

        if(this.buildingModel == null && this.tile.building) {
            this.addBuilding();
        }
        if(this.buildingModel != null) {
        	this.buildingModel.update();
        }
    };

    
    this.addBuilding = function() {
        this.buildingModel = new BuildingModel();
        this.buildingModel.init(this.tile.building, this.drawableTileIndex);
        this.node.add(this.buildingModel.node);
    };
    
    
    this.showBuildable = function(color) {

        this.selectionNode = new THREE.Object3D();
        
        var outlineWidth = 0.005 * cam.threeJSCamera.position.distanceTo(this.node.position);
        
        var geometry = Shapes3D.makeHexagonVolume(
            this.TILE_SIZE + (2 * outlineWidth),
            (-this.TILE_HEIGHT) - outlineWidth,
            outlineWidth
        );
        
        var material = new THREE.MeshBasicMaterial({ color : 0x00cc00, side : THREE.BackSide });
        
        var selectionTile = new THREE.Mesh(geometry, material);
        this.selectionNode.add(selectionTile);

        this.selectionNode.position.copy(this.node.position);
        s.add(this.selectionNode);
    };
    
    
    this.hideBuildable = function() {
        s.remove(this.selectionNode);
        this.selectionNode = null;
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

