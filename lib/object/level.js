var THREE = require('three');

var BLOCK_SIZE = 20;

var assets = require('../assets.js');
var uvMapCubeToTexture = require('../util.js').uvMapCubeToTexture;

var blockMaterial = new THREE.MeshBasicMaterial({
  map: assets.textures.blocksmall
});

var blockGeometry = new THREE.CubeGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
var block = new THREE.Mesh(blockGeometry, blockMaterial);
block.applyMatrix(new THREE.Matrix4().makeTranslation(-BLOCK_SIZE / 2, 0, -BLOCK_SIZE / 2));

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
  level.layout.forEach(function(row, z) {
    row.forEach(function(token, x) {
      if (token === '#') {
        block.position.set(BLOCK_SIZE * x, BLOCK_SIZE, BLOCK_SIZE * z);
        THREE.GeometryUtils.merge(levelGeometry, block);
      }
    });
  });
  return new THREE.Mesh(levelGeometry, blockMaterial);
};

exports.BLOCK_SIZE = BLOCK_SIZE;
