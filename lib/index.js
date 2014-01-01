var THREE = require('three');
var assets = require('./assets.js');

var requestAnimationFrame = require('./shim/request-animation-frame.js').requestAnimationFrame;
var character = require('./object/character.js');
var level = require('./object/level.js');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1500);

var levelMap = require('../levels/demo2.json');
scene.add(level.createObjectFromLevelMap(levelMap));

var floorGeometry = new THREE.PlaneGeometry(10000, 10000);
var floor = new THREE.Mesh(floorGeometry, new THREE.MeshLambertMaterial({ ambient: 0x00ff00 }));
floor.rotation.x = - Math.PI / 2;
scene.add(floor);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.sortObjects = false;
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var characterObject = character.createObject();
characterObject.position.set(50, 0, 0);
scene.add(characterObject);

var clock = new THREE.Clock();
clock.start();

var record;

var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(1, 0.5, 1);
directionalLight.position.setLength(50);
scene.add(directionalLight);

scene.add(new THREE.AxisHelper(400));

assets.whenLoaded(function createItems() {
  record = assets.items.record.clone();
  //record.position.set(30, 0, 0);
  record.scale = new THREE.Vector3(1.5, 1.5, 1.5);
  scene.add(record);
});

assets.whenLoaded(function render() {
  var time = clock.getElapsedTime();
  record.rotation.y = time;
  camera.position.set(
      levelMap.layout[0].length / 2 * level.BLOCK_SIZE,
      250,
      levelMap.layout.length * level.BLOCK_SIZE);
  //camera.position.setLength(400);
  camera.lookAt(new THREE.Vector3(
      levelMap.layout[0].length / 2 * level.BLOCK_SIZE,
      0,
      levelMap.layout.length / 2 * level.BLOCK_SIZE));
  character.animateObject(characterObject, time);
  renderer.render(scene, camera);
  requestAnimationFrame(render, renderer.domElement);
});
