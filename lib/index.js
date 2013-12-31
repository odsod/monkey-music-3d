var THREE = require('three');

var requestAnimationFrame = require('./shim/request-animation-frame.js').requestAnimationFrame;
var uvMapCubeToTexture = require('./util.js').uvMapCubeToTexture;
var textures = require('./textures.js');
var FirstPersonControls = require('./first-person-controls.js').FirstPersonControls;

var character = require('./object/character.js');

var textures = require('./textures.js');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1500);

/* Block */

var BLOCK_SIZE = 20;

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

var level = require('../levels/demo2.json');

level.layout.forEach(function(row, z) {
  row.forEach(function(token, x) {
    if (token === '#') {
      var block = new THREE.Mesh(blockGeometry, blockMaterial);
      block.position.set(BLOCK_SIZE * x, 0, BLOCK_SIZE * z);
      scene.add(block);
    }
  });
});

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var characterObject = character.createObject();
scene.add(characterObject);

var clock = new THREE.Clock();
clock.start();

//scene.add(new THREE.AxisHelper(200));

var render = function() {
  var time = clock.getElapsedTime();
  camera.position.set(20, 20, 20);
  camera.position.setLength(400);
  camera.lookAt(new THREE.Vector3(level.layout[0].length / 2 * BLOCK_SIZE, 0, level.layout.length / 2 * BLOCK_SIZE));
  character.animateObject(characterObject, time);
  renderer.render(scene, camera);
  requestAnimationFrame(render, renderer.domElement);
};

render();
