var THREE = require('three');

var requestAnimationFrame = require('./shim/request-animation-frame.js').requestAnimationFrame;
var uvMapCubeToTexture = require('./util.js').uvMapCubeToTexture;
var textures = require('./textures.js');

var character = require('./model/character.js');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1500);

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
  camera.position.set(0, 0, 50);
  character.animateObject(characterObject, time);
  renderer.render(scene, camera);
  requestAnimationFrame(render, renderer.domElement);
};

render();
