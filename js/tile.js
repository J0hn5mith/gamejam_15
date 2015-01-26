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
  
    this.position = new Position2D();
    this.map;
    this.building = null;


    this.init = function(x, y, map) {
        this.map = map;
        this.building = null;
        this.position.init(x, y)
    };

    this.addBuilding = function(building) {
        this.building = building;
    }
}


function DrawableHexagonTile() {
    
    this.TILE_HEIGHT = 0.12;
    this.TILE_SIZE = 0.92;
    
    this.SPAWN_ANIMATION_Y_MIN = -10;
    this.SPAWN_ANIMATION_Y_MAX = -30;
    this.SPAWN_ANIMATION_SPEED = 3.6;
    
    this.FLOATING_ANIMATION_SPEED = 1.0;
    
    this.DISTANCE_TO_TOWER_Y_INFLUENCE = 0.3;

    this.tile;
    this.drawableTileIndex;
    this.orthogonalPosition;
    
    //this.shaderUniforms;
    //this.shaderAttributes;
    
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
    
    
    /*this.createShaderUniforms = function(geometry) {
        this.shaderUniforms = {
            time : { type : "f", value : 0 },
            amplitude : { type : "f", value : 0 },
            tileX : { type : "f", value : this.orthogonalPosition.x },
            tileY : { type : "f", value : this.orthogonalPosition.y },
        };
    };*/
    
    
    /*this.createShaderAttributes = function(geometry) {
        this.shaderAttributes = {
            aCol : { type : "c", value : [] }
        };
  
        var color = this.getColorCode();
        
        for(var v = 0; v < geometry.vertices.length; v++) {
          this.shaderAttributes.aCol.value.push(new THREE.Color(color));
        }
    };*/
    
    
    this.createTileModel = function() {

      var geometry = Shapes3D.makeHexagonVolume(
          this.TILE_SIZE,
          -this.TILE_HEIGHT / 2,
          this.TILE_HEIGHT / 2
      );

      //this.createShaderUniforms(geometry);
      //this.createShaderAttributes(geometry);
      
      /*var material = new THREE.ShaderMaterial({
        uniforms : THREE.ShaderLib["lambert"].uniforms, //this.shaderUniforms,
        attributes : this.shaderAttributes,
        vertexShader : "#define USE_MAP\n"+THREE.ShaderLib["lambert"].vertexShader, //shaders.floatingHexagon.vertex,
        fragmentShader : "#define USE_MAP\n"+THREE.ShaderLib["lambert"].fragmentShader
      });*/
      
      var color = this.getColorCode();
      var material = new THREE.MeshLambertMaterial({ 
          color : color,
          ambient : color,
      });
      
      this.tileModel = new THREE.Mesh(geometry, material);
      this.tileModel.userData = { drawableTileIndex : this.drawableTileIndex };
      
      this.node.add(this.tileModel);
   };


    this.update = function(floatingAmplitude) {
        
        //this.shaderUniforms.time.value += timer.delta;
        //this.shaderUniforms.amplitude.value = 0.05 + (Math.sin(this.shaderUniforms.time.value) * 0.05);
        
        if(!this.buildingModel && this.tile.building) {
            this.addBuilding();
        }
        
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
    };

    
    this.addBuilding = function() {
        this.buildingModel = new DrawableBuilding();
    };


    this.getColorCode = function() {
        var distance = this.tile.map.getDistanceToCenter(this.tile.position);
        var color;
        if (distance == 0) {
            color = 0x000000;
        }
        else if (distance == 1) {
            color = 0xFF0000;
        }
        else if (distance == 2) {
            color = 0x00FF00;
        }
        else if (distance == 3) {
            color = 0x0000FF;
        }
        else if (distance == 4) {
            color = 0xFF00FF;
        }
        else {
            color = Math.random() * 0xffffff;
        }
        return color;
    };
    
    
    this.showSelection = function(color) {

        this.selectionNode = new THREE.Object3D();
        
        var outlineWidth = 0.006 * cam.threeJSCamera.position.distanceTo(this.node.position);
        
        var geometry = Shapes3D.makeHexagonVolume(
            this.TILE_SIZE + (2 * outlineWidth),
            (-this.TILE_HEIGHT / 2) - outlineWidth,
            (this.TILE_HEIGHT / 2) + outlineWidth
        );
        
        var material = new THREE.MeshBasicMaterial({
            color : color,
            side : THREE.BackSide
        });
        
        var selectionTile = new THREE.Mesh(geometry, material);
        this.selectionNode.add(selectionTile);

        this.selectionNode.position.copy(this.node.position);
        s.add(this.selectionNode);
    };
    
    
    this.hideSelection = function() {
        s.remove(this.selectionNode);
        this.selectionNode = null;
    };
    
}

