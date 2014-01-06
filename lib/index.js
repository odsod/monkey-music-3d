var THREE = require('three');
var assets = require('./assets.js');

var requestAnimationFrame = require('./shim/request-animation-frame.js').requestAnimationFrame;
var character = require('./object/character.js');
var level = require('./object/terrain.js');
var item = require('./object/item.js');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1500);

var levelMap = require('../levels/demo3.json');
scene.add(level.createObjectFromLevelMap(levelMap));

var floorGeometry = new THREE.PlaneGeometry(10000, 10000);
var floor = new THREE.Mesh(floorGeometry, new THREE.MeshBasicMaterial({ ambient: 0x00ff00, color: 0x7f6544 }));
floor.rotation.x = - Math.PI / 2;
//scene.add(floor);

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
characterObject.position.set(0, 0, 0);
//scene.add(characterObject);

var clock = new THREE.Clock();
clock.start();

var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(1, 0.5, 1);
directionalLight.position.setLength(50);
scene.add(directionalLight);

scene.add(new THREE.AxisHelper(400));

var items = [];

var monkeyMusic = new MonkeyMusic3D(level);


var renderLoop = function() {
  requestAnimationFrame(renderLoop);
  
  var time = clock.getElapsedTime();
  var delta = clock.getDelta();

  monkeyMusic.update(clock.getElapsedTime(), clock.getDelta());
};

assets.whenLoaded(function() {
  monkeyMusic.init();
  renderLoop();
});

assets.whenLoaded(function createItems() {
  //levelMap.layout.forEach(function(row, z) {
    //row.split('').forEach(function(token, x) {
      //if (levelMap.legend.items[token]) {
        //var it = item.createObject(levelMap.legend.items[token]);
        //it.position.set(x * level.BLOCK_SIZE, 0, z * level.BLOCK_SIZE);
        //items.push(it);
        //scene.add(it);
      //}
    //});
  //});
});

assets.whenLoaded(function render() {
  var time = clock.getElapsedTime();
  items.forEach(function(item, i) {
    item.rotation.y = time + i * Math.PI / 2;
  });
  camera.position.set(1, 1, 1);
  //camera.position.set(
      //levelMap.layout[0].length / 2 * level.BLOCK_SIZE,
      //300,
      //levelMap.layout.length * level.BLOCK_SIZE);
  camera.position.setLength(5);
  //camera.lookAt(new THREE.Vector3(
      //levelMap.layout[0].length / 2 * level.BLOCK_SIZE,
      //0,
      //levelMap.layout.length / 2 * level.BLOCK_SIZE));
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  character.animateObject(characterObject, time);
  renderer.render(scene, camera);
  requestAnimationFrame(render, renderer.domElement);
});
