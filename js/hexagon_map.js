function Map() {
    // http://keekerdc.com/2011/03/hexagon-grids-coordinate-systems-and-distance-calculations/

    this.radius = 0;
    this.size = 0;
    this.currentRadius = 3;
    this.centerPosition = null;
    this.tiles = [];

    this.init = function(radius) {
        this.size = radius * 2 + 1;
        this.radius = radius;
        this.centerPosition = new Position2D.makePosition(radius, radius);

        for (var x = 0; x < this.size; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < this.size; y++) {
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


    this.getTile = function(x, y) {
        if (!this.doesTileExist(x, y)) {
            return false;
        }

        return this.tiles[x][y];
    };


    this.getTilesForRadius = function(radius) {
        var result = [];
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                var tile = this.getTile(x, y);
                var tileOnRadius = this.getDistanceToCenter(Position2D.makePosition(x, y)) == radius;
                if (tile && tileOnRadius) {
                    result.push(tile);
                }
            }
        }
        return result;
    };
    this.getAllVisibleTiles = function() {
        var result = [];
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                var tile = this.getTile(x, y);
                var tileIsVisible = this.getDistanceToCenter(Position2D.makePosition(x, y)) <= this.getCurrentRadius();
                if (tile && tileIsVisible) {
                    result.push(tile);
                }
            }
        }
        return result;
    };


    this.getAllValidTiles = function() {
        var result = [];
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                var tile = this.getTile(x, y);
                if (tile) {
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
        if (x < 0 && y < 0) {
            return false;
        }

        var tilePosition = Position2D.makePosition(x, y);

        var distance = this.getDistance(tilePosition, this.centerPosition);

        return distance <= this.radius;
    };


    this.getAdjacentTiles = function(x, y, radius) {
        if (!this.doesTileExist(x, y)) {
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
                    }
                    else {
                        result.push(this.getTile(indexX, indexY));
                    }
                }
            }
        }

        return result;
    };

    this.pointInOrthogonalCoordinates = function(position) {
        var xCoordinates = position.x - ((position.y) * 0.5);
        var yCoordinates = position.y * 0.75;
        return Position2D.makePosition(xCoordinates, yCoordinates)
    }
}


DrawableMap = function() {
    this.map = null;
    this.scene = null;
    this.tiles = [];
    this.appearingTiles = [];

    this.currentRadius = 0;


    this.init = function(map, scene) {
        this.map = map;
        this.scene = scene;
        this.appearingTiles = [];
        this.currentRadius = map.getCurrentRadius();

    };


    this.update = function(timeDelta) {

        var timeDelta = 0.01;

        for (var index = 0; index < this.tiles.length; index++) {
            this.tiles[index].update(timeDelta);
        }
        if (this.currentRadius < this.map.getCurrentRadius()) {
            this.increaseRadius(timeDelta);
        }
        this.updateAppearingTiles(timeDelta);
    };

    this.updateAppearingTiles = function(timeDelta) {
        if (!this.appearingTiles.length > 0) {
            return;
        }

        for (var i = 0; i < this.appearingTiles.length; i++) {
            var shape = this.appearingTiles[i].shape;
            shape.position.y += Math.sqrt(1 - shape.position.y)/18;
            if (shape.position.y >= 1){
                shape.position.y = 1;
                this.appearingTiles.splice(i, 1);
            }
        }

    };


    this.increaseRadius = function() {
        this.currentRadius++;
        var tiles = this.map.getTilesForRadius(this.currentRadius);
        var newDrawableTiles = this.addTiles(tiles);
        for (var i = 0; i < newDrawableTiles.length; i++) {
            newDrawableTiles[i].shape.position.y = (Math.random() -1)*20 -10;
        }
        this.appearingTiles = this.appearingTiles.concat(newDrawableTiles);
    };


    this.createTiles = function() {
        var tiles = this.map.getAllVisibleTiles();
        this.addTiles(tiles);
    };


    this.addTiles = function(tiles) {
        var newDrawableTiles = [];
        for (var index = 0; index < tiles.length; index++) {
            var tile = tiles[index];
            if (tile) {
                var newDrawableTile = this.addTile(tile);
                newDrawableTiles.push(newDrawableTile);
            }
        }
        return newDrawableTiles
    };


    this.addTile = function(tile) {
        var hexagonTile = new DrawableHexagonTile(tile);
        this.scene.add(hexagonTile.getShape());
        this.tiles.push(hexagonTile);
        return hexagonTile;
    };
};

DrawableMap.makeDrawableMap = function(map) {
    var drawableMap = new DrawableMap();
    drawableMap.init(map, s);
    drawableMap.createTiles();
    return drawableMap;
};

