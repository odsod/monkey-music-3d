var THREE = require('three');

var assets = require('../assets.js');
var uvMapCubeToTexture = require('../util.js').uvMapCubeToTexture;

var blockMaterial = new THREE.MeshBasicMaterial({
  map: assets.textures.blocksmall
});

var blockGeometry = new THREE.CubeGeometry(1, 1, 1);
var blockMesh = new THREE.Mesh(blockGeometry, blockMaterial);

blockGeometry.faceVertexUvs[0] = uvMapCubeToTexture({
  right:  { x: 0, y: 8, width: 8, height: 8 },
  front:  { x: 0, y: 8, width: 8, height: 8 },
  left:  { x: 0, y: 8, width: 8, height: 8 },
  back:  { x: 0, y: 8, width: 8, height: 8 },
  top:    { x: 0, y: 0, width: 8, height: 8 },
  bottom:    { x: 0, y: 0, width: 8, height: 8 },
  textureWidth: 8,
  textureHeight: 16
});

exports.createObjectFromLevelMap = function(level) {
  var levelGeometry = new THREE.Geometry();
  blockMesh.position.set(0, 0.5, 0);
  THREE.GeometryUtils.merge(levelGeometry, blockMesh);
  blockMesh.position.set(1, 0.5, 1);
  THREE.GeometryUtils.merge(levelGeometry, blockMesh);
  //level.layout.forEach(function(row, z) {
    //row.split('').forEach(function(token, x) {
      //if (level.legend.terrain[token]) {
        //block.position.set(x, 0, z);
        //THREE.GeometryUtils.merge(levelGeometry, block);
      //}
    //});
  //});
  //levelGeometry.applyMatrix(new THREE.Matrix4().makeTranslation());
  return new THREE.Mesh(levelGeometry, blockMaterial);
};
