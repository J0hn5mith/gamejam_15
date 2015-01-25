function Map() {
    // http://keekerdc.com/2011/03/hexagon-grids-coordinate-systems-and-distance-calculations/

    this.radius = 0;
    this.size = 0;
    this.currentRadius = 3;
    this.centerPosition = null;
    this.tiles = [];

    
    this.init = function(radius) {
      
        this.radius = radius;
        this.size = (radius * 2) + 1;
        this.centerPosition = new Position2D.makePosition(radius, radius);

        for(var x = 0; x < this.size; x++) {
            this.tiles[x] = [];
            for(var y = 0; y < this.size; y++) {
                var tile = new Tile();
                tile.init(x, y, this);
                this.tiles[x][y] = tile;
            }
        }
    };


    this.increaseCurrentRadius = function() {
        this.currentRadius++;
    };


    this.getCurrentRadius = function() {
        return this.currentRadius;
    };


    this.setTile = function(x, y, tile) {
        if (!this.doesTileExist(x, y)) {
            return false;
        }
        this.tiles[x][y] = tile;
    };


    this.getTileByPosition = function(position) {
        return this.getTile(position.x, position.y)
    };


    this.getTile = function(x, y) {
        if (!this.doesTileExist(x, y)) {
            return false;
        }
        return this.tiles[x][y];
    };


    this.getTilesInRadiusWithCenter = function(radius, center) {
        var result = [];
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                var tile = this.getTile(x, y);
                var isTileIncluded = this.getDistance(center, Position2D.makePosition(x, y)) <= radius;
                if (tile && isTileIncluded) {
                    result.push(tile);
                }
            }
        }
        return result;

    };


    this.getTilesForRadius = function(radius) {
        var result = [];
        for(var x = 0; x < this.size; x++) {
            for(var y = 0; y < this.size; y++) {
                var tile = this.getTile(x, y);
                var tileOnRadius = this.getDistanceToCenter(Position2D.makePosition(x, y)) == radius;
                if(tile && tileOnRadius) {
                    result.push(tile);
                }
            }
        }
        return result;
    };
    
    
    this.getAllVisibleTiles = function() {
        var result = [];
        for(var x = 0; x < this.size; x++) {
            for(var y = 0; y < this.size; y++) {
                var tile = this.getTile(x, y);
                var tileIsVisible = this.getDistanceToCenter(Position2D.makePosition(x, y)) <= this.currentRadius;
                if(tile && tileIsVisible) {
                    result.push(tile);
                }
            }
        }
        return result;
    };


    this.getAllValidTiles = function() {
        var result = [];
        for(var x = 0; x < this.size; x++) {
            for(var y = 0; y < this.size; y++) {
                var tile = this.getTile(x, y);
                if(tile) {
                    result.push(tile);
                }
            }
        }
        return result;
    };


    this.calculateDistanceVector = function(startPoint, endPoint) {
        var distanceX = endPoint.x - startPoint.x;
        var distanceY = endPoint.y - startPoint.y;
        var distanceZ = endPoint.getZ() - startPoint.getZ();
        return Vector3D.makeVector(distanceX, distanceY, distanceZ);
    };


    this.getDistanceToCenter = function(point) {
        return this.getDistance(point, this.centerPosition);
    };


    this.getDistance = function(startPoint, endPoint) {
        var distanceVector = this.calculateDistanceVector(startPoint, endPoint);
        return Math.max(
            Math.abs(distanceVector.x),
            Math.abs(distanceVector.y),
            Math.abs(distanceVector.z)
        );
    };


    this.doesTileExist = function(x, y) {
        if(x < 0 && y < 0) {
            return false;
        }
        var tilePosition = Position2D.makePosition(x, y);
        var distance = this.getDistance(tilePosition, this.centerPosition);
        return distance <= this.radius;
    };


    this.getAdjacentTiles = function(x, y, radius) {
        if(!this.doesTileExist(x, y)) {
            return [];
        }
        var targetTilePosition = Position2D.makePosition(x, y);

        var halfStep = (radius - Math.floor(radius)) != 0;
        radius = Math.ceil(radius);
        var result = [];

        var startX = limit(x - radius, 0, this.size - 1);
        var endX = limit(x + radius, 0, this.size - 1);
        var startY = limit(y - radius, 0, this.size - 1);
        var endY = limit(y + radius, 0, this.size - 1);

        for (var indexX = startX; indexX <= endX; indexX++) {
            for (var indexY = startY; indexY <= endY; indexY++) {
                var position = Position2D.makePosition(indexX, indexY);
                var distance = this.getDistance(position, targetTilePosition);
                if (distance <= radius) {
                    if (distance == radius && halfStep) {
                        var distanceVector = this.calculateDistanceVector(position, targetTilePosition);
                        if (!distanceVector.isOrthogonalToBaseVector()) {
                            result.push(this.getTile(indexX, indexY));
                        }
                    } else {
                        result.push(this.getTile(indexX, indexY));
                    }
                }
            }
        }
        return result;
    };

}


function DrawableMap() {
    
    this.FLOATING_AMPLITUDE_MIN = 0.05;
    this.FLOATING_AMPLITUDE_MAX = 0.1;
    this.FLOATING_AMPLITUDE_SPEED = 0.5;
  
    this.map;
    this.node;
    
    this.drawableTiles = [];
    this.currentRadius = 0;
    
    this.floatingAmplitudeTimer = 0;


    this.init = function(map) {
      
        this.map = map;
        
        this.node = new THREE.Object3D();
        s.add(this.node);
        
        this.currentRadius = map.getCurrentRadius();
        
        var tiles = this.map.getAllVisibleTiles();
        this.addDrawableTiles(tiles, false);
    };


    this.addDrawableTiles = function(tiles, animateSpawn) {
        for(var i = 0; i < tiles.length; i++) {
           this.addDrawableTile(tiles[i], animateSpawn);
        }
    };


    this.addDrawableTile = function(tile, animateSpawn) {
        var drawableTileIndex = this.drawableTiles.length;
        var drawableTile = new DrawableHexagonTile();
        drawableTile.init(tile, drawableTileIndex, animateSpawn);
        this.node.add(drawableTile.node);
        this.drawableTiles.push(drawableTile);
    };
    
    
    this.update = function() {
        
        if(this.currentRadius < this.map.getCurrentRadius()) {
            this.currentRadius++;
            this.addDrawableTiles(this.map.getTilesForRadius(this.currentRadius), true);
        }
        
        this.floatingAmplitudeTimer += timer.delta * this.FLOATING_AMPLITUDE_SPEED;
        if(this.floatingAmplitudeTimer > 6.2832) {
            this.floatingAmplitudeTimer -= 6.2832;
        }
        var floatingAmplitude = 0.5 + (0.5 * Math.sin(this.floatingAmplitudeTimer));
        floatingAmplitude *= this.FLOATING_AMPLITUDE_MAX - this.FLOATING_AMPLITUDE_MIN;
        floatingAmplitude += this.FLOATING_AMPLITUDE_MIN;

        for(var i = 0; i < this.drawableTiles.length; i++) {
            this.drawableTiles[i].update(floatingAmplitude);
        }
        
        var results = cam.getObjectsAtCoords(mouse.x, mouse.y, this.node.children);
        if(results.length > 0) {
            var index = results[0].object.userData.drawableTileIndex;
            gui.setSelectedMapTile(this.drawableTiles[index]);
        } else {
            gui.setSelectedMapTile(null);
        }
    };
    
}


DrawableMap.makeDrawableMap = function(map) {
    var drawableMap = new DrawableMap();
    drawableMap.init(map);
    return drawableMap;
};