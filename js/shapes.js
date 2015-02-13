/**
 *
 * Created by janmeier on 20.01.15.
 */


function Shapes3D() {

}


Shapes3D.makeHexagon = function(size) {
  
    var geometry = new THREE.Geometry();
    
    geometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.0));
    
    geometry.vertices.push(new THREE.Vector3(size * 0.0, 0.0, size * -0.5));
    geometry.vertices.push(new THREE.Vector3(size * 0.433, 0.0, size * -0.25));
    geometry.vertices.push(new THREE.Vector3(size * 0.433, 0.0, size * 0.25));
    geometry.vertices.push(new THREE.Vector3(size * 0.0, 0.0, size * 0.5));
    geometry.vertices.push(new THREE.Vector3(size * -0.433, 0.0, size * 0.25));
    geometry.vertices.push(new THREE.Vector3(size * -0.433, 0.0, size * -0.25));
    
    geometry.faces.push(new THREE.Face3(0, 2, 1));
    geometry.faces.push(new THREE.Face3(0, 3, 2));
    geometry.faces.push(new THREE.Face3(0, 4, 3));
    geometry.faces.push(new THREE.Face3(0, 5, 4));
    geometry.faces.push(new THREE.Face3(0, 6, 5));
    geometry.faces.push(new THREE.Face3(0, 1, 6));
    
    geometry.computeFaceNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    return geometry;
};


Shapes3D.makeHexagonVolume = function(size, bottom, top) {
  
  var geometry = new THREE.Geometry();
  
  geometry.vertices.push(new THREE.Vector3(0.0, top, 0.0));
  
  geometry.vertices.push(new THREE.Vector3(size * 0.0, top, size * -0.5));
  geometry.vertices.push(new THREE.Vector3(size * 0.433, top, size * -0.25));
  geometry.vertices.push(new THREE.Vector3(size * 0.433, top, size * 0.25));
  geometry.vertices.push(new THREE.Vector3(size * 0.0, top, size * 0.5));
  geometry.vertices.push(new THREE.Vector3(size * -0.433, top, size * 0.25));
  geometry.vertices.push(new THREE.Vector3(size * -0.433, top, size * -0.25));
  
  geometry.vertices.push(new THREE.Vector3(0.0, bottom, 0.0));
  
  geometry.vertices.push(new THREE.Vector3(size * 0.0, bottom, size * -0.5));
  geometry.vertices.push(new THREE.Vector3(size * 0.433, bottom, size * -0.25));
  geometry.vertices.push(new THREE.Vector3(size * 0.433, bottom, size * 0.25));
  geometry.vertices.push(new THREE.Vector3(size * 0.0, bottom, size * 0.5));
  geometry.vertices.push(new THREE.Vector3(size * -0.433, bottom, size * 0.25));
  geometry.vertices.push(new THREE.Vector3(size * -0.433, bottom, size * -0.25));
  
  geometry.faces.push(new THREE.Face3(0, 2, 1));
  geometry.faces.push(new THREE.Face3(0, 3, 2));
  geometry.faces.push(new THREE.Face3(0, 4, 3));
  geometry.faces.push(new THREE.Face3(0, 5, 4));
  geometry.faces.push(new THREE.Face3(0, 6, 5));
  geometry.faces.push(new THREE.Face3(0, 1, 6));
  
  geometry.faces.push(new THREE.Face3(7, 8, 9));
  geometry.faces.push(new THREE.Face3(7, 9, 10));
  geometry.faces.push(new THREE.Face3(7, 10, 11));
  geometry.faces.push(new THREE.Face3(7, 11, 12));
  geometry.faces.push(new THREE.Face3(7, 12, 13));
  geometry.faces.push(new THREE.Face3(7, 13, 8));
  
  geometry.faces.push(new THREE.Face3(1, 2, 8));
  geometry.faces.push(new THREE.Face3(9, 8, 2));
  
  geometry.faces.push(new THREE.Face3(2, 3, 9));
  geometry.faces.push(new THREE.Face3(10, 9, 3));
  
  geometry.faces.push(new THREE.Face3(3, 4, 10));
  geometry.faces.push(new THREE.Face3(11, 10, 4));
  
  geometry.faces.push(new THREE.Face3(4, 5, 11));
  geometry.faces.push(new THREE.Face3(12, 11, 5));
  
  geometry.faces.push(new THREE.Face3(5, 6, 12));
  geometry.faces.push(new THREE.Face3(13, 12, 6));
  
  geometry.faces.push(new THREE.Face3(6, 1, 13));
  geometry.faces.push(new THREE.Face3(8, 13, 1));
  
  geometry.computeFaceNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
 
  return geometry;
};


Shapes3D.makeHouse = function(width, depth, height, roofHeight) {
	
	var geometry = new THREE.Geometry();
	
	width /= 2;
	depth /= 2;
    
    geometry.vertices.push(new THREE.Vector3(-width, 0.0, -depth));
    geometry.vertices.push(new THREE.Vector3(-width, 0.0, depth));
    geometry.vertices.push(new THREE.Vector3(width, 0.0, depth));
    geometry.vertices.push(new THREE.Vector3(width, 0.0, -depth));
    
    geometry.vertices.push(new THREE.Vector3(-width, height, -depth));
    geometry.vertices.push(new THREE.Vector3(-width, height, depth));
    geometry.vertices.push(new THREE.Vector3(width, height, depth));
    geometry.vertices.push(new THREE.Vector3(width, height, -depth));
    
    geometry.vertices.push(new THREE.Vector3(0.0, height + roofHeight, -depth));
    geometry.vertices.push(new THREE.Vector3(0.0, height + roofHeight, depth));
    
    geometry.faces.push(new THREE.Face3(0, 3, 1));
    geometry.faces.push(new THREE.Face3(1, 3, 2));
    
    geometry.faces.push(new THREE.Face3(0, 1, 4));
    geometry.faces.push(new THREE.Face3(1, 5, 4));
    geometry.faces.push(new THREE.Face3(1, 2, 5));
    geometry.faces.push(new THREE.Face3(2, 6, 5));
    geometry.faces.push(new THREE.Face3(2, 3, 6));
    geometry.faces.push(new THREE.Face3(3, 7, 6));
    geometry.faces.push(new THREE.Face3(0, 4, 3));
    geometry.faces.push(new THREE.Face3(3, 4, 7));
    
    geometry.faces.push(new THREE.Face3(4, 5, 8));
    geometry.faces.push(new THREE.Face3(5, 9, 8));
    geometry.faces.push(new THREE.Face3(6, 7, 9));
    geometry.faces.push(new THREE.Face3(7, 8, 9));
    
    geometry.faces.push(new THREE.Face3(5, 6, 9));
    geometry.faces.push(new THREE.Face3(4, 8, 7));
    
    geometry.computeFaceNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    return geometry;
};


Shapes3D.makeGear = function(radius, teethSize, height, teeth) {
	
	var geometry = new THREE.Geometry();
	
	var piePieceAngle = toRad(360) / (2 * teeth);
	
	var radius2 = radius + teethSize;
	
	for(var i = 0; i < teeth; i++) {
		
		var angle1 = (i * 2) * piePieceAngle;
		var angle2 = ((i * 2) + 1) * piePieceAngle;
		var angle3 = ((i * 2) + 2) * piePieceAngle;
		
	    geometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.0));
	    
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle1) * radius, 0.0, Math.cos(angle1) * radius));
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle2) * radius, 0.0, Math.cos(angle2) * radius));
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle3) * radius, 0.0, Math.cos(angle3) * radius));
	    
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle1) * radius2, 0.0, Math.cos(angle1) * radius2));
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle2) * radius2, 0.0, Math.cos(angle2) * radius2));
	    
	    geometry.vertices.push(new THREE.Vector3(0.0, height, 0.0));
	    
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle1) * radius, height, Math.cos(angle1) * radius));
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle2) * radius, height, Math.cos(angle2) * radius));
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle3) * radius, height, Math.cos(angle3) * radius));
	   
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle1) * radius2, height, Math.cos(angle1) * radius2));
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle2) * radius2, height, Math.cos(angle2) * radius2));
	    
	    var s = 12 * i;
	    
	    geometry.faces.push(new THREE.Face3(s + 0, s + 5, s + 4));
	    geometry.faces.push(new THREE.Face3(s + 0, s + 3, s + 2));
	    
	    geometry.faces.push(new THREE.Face3(s + 6, s + 10, s + 11));
	    geometry.faces.push(new THREE.Face3(s + 6, s + 8, s + 9));
	    
	    geometry.faces.push(new THREE.Face3(s + 1, s + 4, s + 7));
	    geometry.faces.push(new THREE.Face3(s + 4, s + 10, s + 7));
	    
	    geometry.faces.push(new THREE.Face3(s + 4, s + 11, s + 10));
	    geometry.faces.push(new THREE.Face3(s + 4, s + 5, s + 11));
	    
	    geometry.faces.push(new THREE.Face3(s + 5, s + 8, s + 11));
	    geometry.faces.push(new THREE.Face3(s + 5, s + 2, s + 8));
	    
	    geometry.faces.push(new THREE.Face3(s + 2, s + 9, s + 8));
	    geometry.faces.push(new THREE.Face3(s + 2, s + 3, s + 9));
	}
	
    geometry.computeFaceNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

	return geometry;
};


Shapes3D.makeCupola = function(radius, segments, verticalSegments) {
	
	var geometry = new THREE.Geometry();
	
	var piePieceAngle = toRad(360) / segments;
	var vPiePieceAngle = toRad(90) / verticalSegments;
	
	for(var i = 0; i < segments; i++) {
		
		var angle1 = i * piePieceAngle;
		var angle2 = (i + 1) * piePieceAngle;
		
	    geometry.vertices.push(new THREE.Vector3(0.0, radius, 0.0));
	    
	    for(var j = 1; j <= verticalSegments; j++) {
	    	
	    	var vr = Math.sin(j * vPiePieceAngle);
	    	var h = Math.cos(j * vPiePieceAngle) * radius;
	    	
	    	geometry.vertices.push(new THREE.Vector3(Math.sin(angle1) * radius * vr, h, Math.cos(angle1) * radius * vr));
		    geometry.vertices.push(new THREE.Vector3(Math.sin(angle2) * radius * vr, h, Math.cos(angle2) * radius * vr));
	    }
	    
	    var s = ((verticalSegments * 2) + 1) * i;
	    
	    geometry.faces.push(new THREE.Face3(s + 0, s + 1, s + 2));
	    
	    for(var j = 0; j < verticalSegments - 1; j++) {
		    geometry.faces.push(new THREE.Face3(s + 1 + (j * 2), s + 3 + (j * 2), s + 2 + (j * 2)));
		    geometry.faces.push(new THREE.Face3(s + 2 + (j * 2), s + 3 + (j * 2), s + 4 + (j * 2)));
	    }
	}
	
    geometry.computeFaceNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

	return geometry;
};


Shapes3D.makeCylinder = function(radius, height, segments) {
	
	var geometry = new THREE.Geometry();
	
	var piePieceAngle = toRad(360) / segments;
	
	for(var i = 0; i < segments; i++) {
		
		var angle1 = i * piePieceAngle;
		var angle2 = (i + 1) * piePieceAngle;
		
	    geometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.0));
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle1) * radius, 0.0, Math.cos(angle1) * radius));
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle2) * radius, 0.0, Math.cos(angle2) * radius));
	    
	    geometry.vertices.push(new THREE.Vector3(0.0, height, 0.0));
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle1) * radius, height, Math.cos(angle1) * radius));
	    geometry.vertices.push(new THREE.Vector3(Math.sin(angle2) * radius, height, Math.cos(angle2) * radius));
	    
	    var s = 6 * i;
	    
	    geometry.faces.push(new THREE.Face3(s + 3, s + 4, s + 5));
	    geometry.faces.push(new THREE.Face3(s + 0, s + 2, s + 1));
	    
	    geometry.faces.push(new THREE.Face3(s + 1, s + 2, s + 5));
	    geometry.faces.push(new THREE.Face3(s + 1, s + 5, s + 4));
	}
	
    geometry.computeFaceNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

	return geometry;
};
