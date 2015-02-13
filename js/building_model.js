function BuildingModel() {
	
	this.MAX_LEVELS = 10;
	
	this.building;
	
	this.node;
	this.drawableTileIndex;
	
	this.elements = [];
	
	this.levelConstructionTimers = [];
	
	
	this.init = function(building, drawableTileIndex) {
		
		this.building = building;
		
		this.node = new THREE.Object3D();
		this.drawableTileIndex = drawableTileIndex;
		
		if(building.code == BuildingCodes.HOUSE) {
			// Level 1
			this.addHouse(0.16, 0.20, 0.20, 0.08, 0x663300); // 0
			this.addGear(0.15, 0.03, 0.04, 18, 0x888888); // 1
			// Level 2
			this.addHouse(0.16, 0.20, 0.16, 0.08, 0x663300); // 2
			this.addGear(0.15, 0.03, 0.04, 18, 0x888888); // 3
			// Level 3
			this.addHouse(0.16, 0.20, 0.24, 0.08, 0x663300); // 4
			this.addGear(0.15, 0.03, 0.04, 18, 0x888888); // 5
			
		} else if(building.code == BuildingCodes.TOWER) {
			// Level 1
			this.addCupola(0.20, 18, 2, 0x555555); // 0
			this.addGear(0.20, 0.03, 0.04, 24, 0x888888); // 1
			// Level 1-7
			for(var i = 1; i <= 7; i++) {
				this.addCylinder(0.20 + (0.02 * i), 0.20, 18, 0x555555);
				this.addGear(0.21 + (0.02 * i), 0.03, 0.04, 24, 0x888888);
			}


			
		} else {
			this.addHouse(0.2, 0.25, 0.3, 0.1, 0x333333);
		}
		
		for(var i = 0; i < this.MAX_LEVELS; i++) {
			this.levelConstructionTimers[i] = 0.0;
		}
	};
	
	
	this.addHouse = function(width, depth, height, roofHeight, color) {
		var geometry = Shapes3D.makeHouse(width, depth, height, roofHeight);
		this.addElement(geometry, color);
	};
	
	
	this.addGear = function(radius, teethSize, height, teeth, color) {
		var geometry = Shapes3D.makeGear(radius, teethSize, height, teeth);
		this.addElement(geometry, color);
	};
	
	
	this.addCupola = function(radius, segments, verticalSegments, color) {
		var geometry = Shapes3D.makeCupola(radius, segments, verticalSegments);
		this.addElement(geometry, color);
	};
	
	
	this.addCylinder = function(radius, height, segments, color) {
		var geometry = Shapes3D.makeCylinder(radius, height, segments);
		this.addElement(geometry, color);
	};
	
	
	this.addElement = function(geometry, color) {
		
		var material = new THREE.MeshLambertMaterial({ color : color, ambient : color });
	      
	    model = new THREE.Mesh(geometry, material);
	    model.userData = { drawableTileIndex : this.drawableTileIndex };
	    model.castShadow = true;
	    model.receiveShadow = true;
	    model.frustumCulled = false; // prevents errors while generating shadows
		
		this.elements.push(model);
		this.node.add(model);
	};
	
	
	this.update = function() {
		
		var t = this.levelConstructionTimers;
		
		var hasChange = false;
		
		for(var i = 0; i < this.MAX_LEVELS; i++) {
			if(i <= this.building.level && t[i] < 1.0) {
				t[i] += timer.delta * 0.66;
				if(t[i] > 1.0) {
					t[i] = 1.0;
				}
				hasChange = true;
			}
		}
		
		if(hasChange) {
			
			if(this.building.code == BuildingCodes.HOUSE) {
				this.elements[0].position.set(-0.17, -0.24 + (t[1] * 0.28), -0.12);
				this.elements[0].rotation.set(0.0, (t[1] * toRad(120)), 0.0);
				
				this.elements[1].position.set(-0.17, 0.0, -0.12);
				this.elements[1].rotation.set(0.0, (t[1] * toRad(-240)), 0.0);
				
				if(t[2] > 0.0) {
					this.elements[2].position.set(0.19, -0.20 + (t[2] * 0.24), -0.08);
					this.elements[2].rotation.set(0.0, (t[2] * toRad(120)), 0.0);
					
					this.elements[3].position.set(0.19, 0.0, -0.08);
					this.elements[3].rotation.set(0.0, (t[2] * toRad(-240)), 0.0);
				} else {
					this.elements[2].position.set(0.0, -1000, 0.0);
					this.elements[3].position.set(0.0, -1000, 0.0);
				}

				if(t[3] > 0.0) {
					this.elements[4].position.set(-0.02, -0.28 + (t[3] * 0.32), 0.22);
					this.elements[4].rotation.set(0.0, (t[3] * toRad(120)), 0.0);
					
					this.elements[5].position.set(-0.02, 0.0, 0.22);
					this.elements[5].rotation.set(0.0, (t[3] * toRad(-240)), 0.0);
				} else {
					this.elements[4].position.set(0.0, -1000, 0.0);
					this.elements[5].position.set(0.0, -1000, 0.0);
				}
				
			} else if(this.building.code == BuildingCodes.TOWER) {
				
				var height = 0;
				var rotation = 0;
				
				for(var i = 7; i >= 1; i--) {
					if(t[i] > 0.0) {
						if(i == 0) {
							height += t[i] * 0.48;
						} else {
							height += t[i] * 0.24;
						}
						rotation += t[i] * toRad(120);
						
						this.elements[(i * 2)].position.set(0.0, height - 0.20, 0.0);
						this.elements[(i * 2)].rotation.set(0.0, (t[i] * toRad(120)) + rotation, 0.0);
						
						this.elements[(i * 2) + 1].position.set(0.0, limit(height - 0.24, 0, 1000), 0.0);
						this.elements[(i * 2) + 1].rotation.set(0.0, (t[i] * toRad(-240)) + rotation, 0.0);
					} else {
						this.elements[(i * 2)].position.set(0.0, -1000, 0.0);
						this.elements[(i * 2) + 1].position.set(0.0, -1000, 0.0);
					}
				}
				this.elements[0].position.set(0.0, height, 0.0);
				this.elements[0].rotation.set(0.0, (t[1] * toRad(120)) + rotation, 0.0);
				
				this.elements[1].position.set(0.0, height - 0.04, 0.0);
				this.elements[1].rotation.set(0.0, (t[1] * toRad(120)) + rotation, 0.0);
			}
		}
	};
	
}