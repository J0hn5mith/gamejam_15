function DrawableMap() {
    
    this.FLOATING_AMPLITUDE_MIN = 0.05;
    this.FLOATING_AMPLITUDE_MAX = 0.1;
    this.FLOATING_AMPLITUDE_SPEED = 0.3;
  
    this.map;
    
    this.node;
    
    this.drawableTiles = [];
    this.currentRadius;
    
    this.floatingAmplitudeTimer = 0;


    this.init = function(map) {
      
        this.map = map;
        
        this.node = new THREE.Object3D();
        s.add(this.node);
        
        this.addDrawableTiles(this.map.getAllVisibleTiles(), false);
        this.currentRadius = this.map.getCurrentRadius();
    };


    this.addDrawableTiles = function(tiles, animateSpawn) {
        for(var i = 0; i < tiles.length; i++) {
            var drawableTileIndex = this.drawableTiles.length;
            var drawableTile = new DrawableTile();
            drawableTile.init(tiles[i], drawableTileIndex, animateSpawn);
            this.node.add(drawableTile.node);
            this.drawableTiles.push(drawableTile);
        }
    };
    
    
    this.mouseSelect = function() {
        var results = cam.getObjectsAtCoords(mouse.x, mouse.y, this.node.children);
        if(results.length > 0) {
            var index = results[0].object.userData.drawableTileIndex;
            gui.setSelectedMapTile(this.drawableTiles[index]);
        } else {
            gui.setSelectedMapTile(null);
        }
    };
    
    
    this.showBuildableTiles = function(assembly) {
        for(var i = 0; i < this.drawableTiles.length; i++) {
        	if(this.drawableTiles[i].tile.isBuildable(assembly)) {
        		this.drawableTiles[i].showBuildable();
        	}
        } 
    };
    
    
    this.hideBuildableTiles = function() {
        for(var i = 0; i < this.drawableTiles.length; i++) {
            this.drawableTiles[i].hideBuildable();
        }
    };
    
    
    this.mouseDeselect = function() {
        gui.setSelectedMapTile(null);
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
    };
    
}
