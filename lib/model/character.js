var THREE = require('three');
var textures = require('../textures.js');
var uvMapCubeToTexture = require('../util.js').uvMapCubeToTexture;

var LEG_HEIGHT = 6;
var LEG_WIDTH = 4;

var BODY_HEIGHT = 12;

var charMaterial = new THREE.MeshBasicMaterial({
  map: textures.monkey
});

var legGeometry = new THREE.CubeGeometry(4, LEG_HEIGHT, 4);
legGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -LEG_HEIGHT / 2, 0));

var armGeometry = new THREE.CubeGeometry(4, 12, 4);
armGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -4, 0));

var bodyGeometry = new THREE.CubeGeometry(4, BODY_HEIGHT, 8);

var headGeometry = new THREE.CubeGeometry(8, 8, 8);

legGeometry.faceVertexUvs[0] = uvMapCubeToTexture({
  right:  { x: 0, y: 0, width: 4, height: 12 },
  front:  { x: 4, y: 0, width: 4, height: 12 },
  left:   { x: 8, y: 0, width: 4, height: 12 },
  back:   { x: 12, y: 0, width: 4, height: 12 },
  top:    { x: 4, y: 12, width: 4, height: 4 },
  bottom: { x: 8, y: 12, width: 4, height: 4 },
  textureWidth: 64,
  textureHeight: 32
});

bodyGeometry.faceVertexUvs[0] = uvMapCubeToTexture({
  right:  { x: 16, y: 0, width: 4, height: 12 },
  front:  { x: 20, y: 0, width: 8, height: 12 },
  left:   { x: 28, y: 0, width: 4, height: 12 },
  back:   { x: 32, y: 0, width: 8, height: 12 },
  top:    { x: 20, y: 12, width: 8, height: 4 },
  bottom: { x: 28, y: 12, width: 8, height: 4 },
  textureWidth: 64,
  textureHeight: 32
});

armGeometry.faceVertexUvs[0] = uvMapCubeToTexture({
  right:  { x: 40, y: 0, width: 4, height: 12 },
  front:  { x: 44, y: 0, width: 4, height: 12 },
  left:   { x: 48, y: 0, width: 4, height: 12 },
  back:   { x: 52, y: 0, width: 4, height: 12 },
  top:    { x: 44, y: 12, width: 4, height: 4 },
  bottom: { x: 48, y: 12, width: 4, height: 4 },
  textureWidth: 64,
  textureHeight: 32
});

headGeometry.faceVertexUvs[0] = uvMapCubeToTexture({
  top:    { x: 8, y: 24, width: 8, height: 8 },
  front:  { x: 8, y: 16, width: 8, height: 8 },
  right:  { x: 0, y: 16, width: 8, height: 8 },
  left:   { x: 16, y: 16, width: 8, height: 8 },
  bottom: { x: 16, y: 24, width: 8, height: 8 },
  back:   { x: 24, y: 16, width: 8, height: 8 },
  textureWidth: 64,
  textureHeight: 32
});

exports.createObject = function() {
  var characterObject = new THREE.Object3D();

  var parts = {
    head: new THREE.Mesh(headGeometry, charMaterial),
    leftArm: new THREE.Mesh(armGeometry, charMaterial),
    rightArm: new THREE.Mesh(armGeometry, charMaterial),
    body: new THREE.Mesh(bodyGeometry, charMaterial),
    leftLeg: new THREE.Mesh(legGeometry, charMaterial),
    rightLeg: new THREE.Mesh(legGeometry, charMaterial)
  };

  characterObject.parts = parts;

  parts.head.position.set(0, 10, 0);
  parts.body.position.set(0, 0, 0);
  parts.leftArm.position.set(Math.PI / 32, 4, -6);
  parts.rightArm.position.set(-Math.PI / 32, 4, 6);
  parts.leftLeg.position.set(0, -6, -2);
  parts.rightLeg.position.set(0, -6, 2);

  characterObject.add(parts.head);
  characterObject.add(parts.body);
  characterObject.add(parts.leftArm);
  characterObject.add(parts.rightArm);
  characterObject.add(parts.leftLeg);
  characterObject.add(parts.rightLeg);

  return characterObject;
};

exports.animateObject = function(characterObject, time) {
  var parts = characterObject.parts;

  parts.rightArm.rotation.z = 2 * Math.cos(0.6662 * time * 10 + Math.PI);
  parts.rightArm.rotation.x = 1 * (Math.cos(0.2812 * time * 10) - 1);
  parts.leftArm.rotation.z = 2 * Math.cos(0.6662 * time * 10);
  parts.leftArm.rotation.x = 1 * (Math.cos(0.2312 * time * 10) + 1);

  parts.rightLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10);
  parts.leftLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10 + Math.PI);

  characterObject.rotation.y = time;
};