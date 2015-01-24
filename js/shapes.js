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


Shapes3D.makeHexagonVolume = function(material, bottom, top) {
  
  var hexagonGeometry = new THREE.Geometry();
  
  hexagonGeometry.vertices.push(new THREE.Vector3(0.0, top, 0.0));
  
  hexagonGeometry.vertices.push(new THREE.Vector3(0.5, top, -0.25));
  hexagonGeometry.vertices.push(new THREE.Vector3(0.5, top, 0.25));
  hexagonGeometry.vertices.push(new THREE.Vector3(0.0, top, -0.5));
  hexagonGeometry.vertices.push(new THREE.Vector3(0.0, top, 0.5));
  hexagonGeometry.vertices.push(new THREE.Vector3(-0.5, top, -0.25));
  hexagonGeometry.vertices.push(new THREE.Vector3(-0.5, top, 0.25));
  
  hexagonGeometry.vertices.push(new THREE.Vector3(0.0, bottom, 0.0));
  
  hexagonGeometry.vertices.push(new THREE.Vector3(0.5, bottom, -0.25));
  hexagonGeometry.vertices.push(new THREE.Vector3(0.5, bottom, 0.25));
  hexagonGeometry.vertices.push(new THREE.Vector3(0.0, bottom, -0.5));
  hexagonGeometry.vertices.push(new THREE.Vector3(0.0, bottom, 0.5));
  hexagonGeometry.vertices.push(new THREE.Vector3(-0.5, bottom, -0.25));
  hexagonGeometry.vertices.push(new THREE.Vector3(-0.5, bottom, 0.25));
  
  hexagonGeometry.faces.push(new THREE.Face3(0, 2, 1));
  hexagonGeometry.faces.push(new THREE.Face3(0, 4, 2));
  hexagonGeometry.faces.push(new THREE.Face3(0, 6, 4));
  hexagonGeometry.faces.push(new THREE.Face3(0, 5, 6));
  hexagonGeometry.faces.push(new THREE.Face3(0, 3, 5));
  hexagonGeometry.faces.push(new THREE.Face3(0, 1, 3));
  
  /*hexagonGeometry.faces.push(new THREE.Face3(7, 9, 8));
  hexagonGeometry.faces.push(new THREE.Face3(7, 11, 9));
  hexagonGeometry.faces.push(new THREE.Face3(7, 13, 11));
  hexagonGeometry.faces.push(new THREE.Face3(7, 12, 13));
  hexagonGeometry.faces.push(new THREE.Face3(7, 10, 12));
  hexagonGeometry.faces.push(new THREE.Face3(7, 8, 10));*/

  return new THREE.Mesh(hexagonGeometry, material);
}


