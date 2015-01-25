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

    this.tile;
    this.orthogonalPosition;
    
    this.shaderUniforms;
    this.shaderAttributes;
    
    this.tileModel;
    this.buildingModel;
    
   
    this.init = function(tile) {
      this.tile = tile;
      this.setOrthogonalPosition();
      
      this.createTileModel();
      this.buildingModel = null;
    };
    
    
    this.setOrthogonalPosition = function() {
      var x = (this.tile.position.x * 0.866) - (this.tile.position.y * 0.433);
      var y = this.tile.position.y * 0.75;
      var mapRadius = this.tile.map.radius;
      x -= mapRadius * 0.433;
      y -= mapRadius * 0.75;
      this.orthogonalPosition = Position2D.makePosition(x, y);
    };
    
    
    this.createShaderUniforms = function(geometry) {
        this.shaderUniforms = {
            time : { type : "f", value : 0 },
            amplitude : { type : "f", value : 0 },
            tileX : { type : "f", value : this.orthogonalPosition.x },
            tileY : { type : "f", value : this.orthogonalPosition.y },
        };
    };
    
    
    this.createShaderAttributes = function(geometry) {
        this.shaderAttributes = {
            aCol : { type : "c", value : [] }
        };
  
        var color = this.getColorCode();
        
        for(var v = 0; v < geometry.vertices.length; v++) {
          this.shaderAttributes.aCol.value.push(new THREE.Color(color));
        }
    };
    
    
    this.createTileModel = function() {

      var geometry = Shapes3D.makeHexagonVolume(1.0, -0.2, 0.0);

      this.createShaderUniforms(geometry);
      this.createShaderAttributes(geometry);
      
      var material = new THREE.ShaderMaterial({
        uniforms: this.shaderUniforms,
        attributes: this.shaderAttributes,
        vertexShader: shaders.floatingHexagon.vertex,
        fragmentShader: shaders.floatingHexagon.fragment
      });
      
      this.tileModel = new THREE.Mesh(geometry, material);
      this.tileModel.position.set(this.orthogonalPosition.x, 0, this.orthogonalPosition.y);
   };


    this.update = function() {
        this.shaderUniforms.time.value += timer.delta;
        this.shaderUniforms.amplitude.value = Math.sin(this.shaderUniforms.time.value) * 0.2;
        if(!this.buildingModel && this.tile.building) {
            this.addBuilding();
        }
    };

    
    this.addBuilding = function() {
      
        //DEBUG:
        this.shaderAttributes.aCol.value[0] = (new THREE.Color(this.tile.building.debugColor));
        this.shaderAttributes.aCol.needsUpdate = true;
        
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
    
}

