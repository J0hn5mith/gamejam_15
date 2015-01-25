/**
 *
 * Created by janmeier on 20.01.15.
 */


Shapes3D = function () {

}


Shapes3D.makeHexagon = function (material) {
  
    var hexagonGeometry = new THREE.Geometry();
    
    hexagonGeometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.0));
    
    hexagonGeometry.vertices.push(new THREE.Vector3(0.433, 0.0, -0.25));
    hexagonGeometry.vertices.push(new THREE.Vector3(0.433, 0.0, 0.25));
    hexagonGeometry.vertices.push(new THREE.Vector3(0.0, 0.0, -0.5));
    hexagonGeometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.5));
    hexagonGeometry.vertices.push(new THREE.Vector3(-0.433, 0.0, -0.25));
    hexagonGeometry.vertices.push(new THREE.Vector3(-0.433, 0.0, 0.25));
    
    hexagonGeometry.faces.push(new THREE.Face3(0, 2, 1));
    hexagonGeometry.faces.push(new THREE.Face3(0, 4, 2));
    hexagonGeometry.faces.push(new THREE.Face3(0, 6, 4));
    hexagonGeometry.faces.push(new THREE.Face3(0, 5, 6));
    hexagonGeometry.faces.push(new THREE.Face3(0, 3, 5));
    hexagonGeometry.faces.push(new THREE.Face3(0, 1, 3));

    return new THREE.Mesh(hexagonGeometry, material);
}


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
 
  return geometry;
}


