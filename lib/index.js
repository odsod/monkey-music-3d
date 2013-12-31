var THREE = require('three');

var requestAnimationFrame = require('./shim/request-animation-frame.js').requestAnimationFrame;
var uvMapCubeToTexture = require('./util.js').uvMapCubeToTexture;
var textures = require('./textures.js');
var FirstPersonControls = require('./first-person-controls.js').FirstPersonControls;

var character = require('./object/character.js');
var level = require('./object/level.js');

var textures = require('./textures.js');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1500);

var levelMap = require('../levels/demo2.json');
scene.add(level.createObjectFromLevelMap(levelMap));

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

var render = function() {
  var time = clock.getElapsedTime();
  camera.position.set(20, 20, 20);
  camera.position.setLength(400);
  camera.lookAt(new THREE.Vector3(
      levelMap.layout[0].length / 2 * level.BLOCK_SIZE,
      0,
      levelMap.layout.length / 2 * level.BLOCK_SIZE));
  character.animateObject(characterObject, time);
  renderer.render(scene, camera);
  requestAnimationFrame(render, renderer.domElement);
};

render();
