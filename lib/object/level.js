var THREE = require('three');

var BLOCK_SIZE = 20;

var textures = require('../textures.js');
var uvMapCubeToTexture = require('../util.js').uvMapCubeToTexture;

var blockMaterial = new THREE.MeshBasicMaterial({
  map: textures.block
});

var blockGeometry = new THREE.CubeGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

blockGeometry.faceVertexUvs[0] = uvMapCubeToTexture({
  right:  { x: 0, y: 16, width: 16, height: 16 },
  front:  { x: 0, y: 16, width: 16, height: 16 },
  left:  { x: 0, y: 16, width: 16, height: 16 },
  back:  { x: 0, y: 16, width: 16, height: 16 },
  top:    { x: 0, y: 0, width: 16, height: 16 },
  bottom:    { x: 0, y: 0, width: 16, height: 16 },
  textureWidth: 16,
  textureHeight: 32
});

exports.createObjectFromLevelMap = function(level) {
  var levelObject = new THREE.Object3D();
  level.layout.forEach(function(row, z) {
    row.forEach(function(token, x) {
      if (token === '#') {
        var block = new THREE.Mesh(blockGeometry, blockMaterial);
        block.position.set(BLOCK_SIZE * x, 0, BLOCK_SIZE * z);
        levelObject.add(block);
      }
    });
  });
  return levelObject;
};

exports.BLOCK_SIZE = BLOCK_SIZE;
