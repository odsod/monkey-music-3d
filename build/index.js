require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var THREE = require('three');

var requestAnimationFrame = require('./shim/request-animation-frame.js').requestAnimationFrame;
var uvMapCubeToTexture = require('./util.js').uvMapCubeToTexture;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1500);

var cb = function() {};

var charMaterial = new THREE.MeshBasicMaterial();

var legGeometry = new THREE.CubeGeometry(4, 12, 4);
legGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -6, 0));
var armGeometry = new THREE.CubeGeometry(4, 12, 4);
armGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -4, 0));
var bodyGeometry = new THREE.CubeGeometry(4, 12, 8);
var headGeometry = new THREE.CubeGeometry(8, 8, 8);

var leftLeg = new THREE.Mesh(legGeometry, charMaterial);
var rightLeg = new THREE.Mesh(legGeometry, charMaterial);
var body = new THREE.Mesh(bodyGeometry, charMaterial);
var leftArm = new THREE.Mesh(armGeometry, charMaterial);
var rightArm = new THREE.Mesh(armGeometry, charMaterial);
var head = new THREE.Mesh(headGeometry, charMaterial);

head.position.set(0, 10, 0);
body.position.set(0, 0, 0);
leftArm.position.set(Math.PI / 32, 4, -6);
rightArm.position.set(-Math.PI / 32, 4, 6);
leftLeg.position.set(0, -6, -2);
rightLeg.position.set(0, -6, 2);

var character = new THREE.Object3D();
character.add(head);
character.add(body);
character.add(leftArm);
character.add(rightArm);
character.add(leftLeg);
character.add(rightLeg);

scene.add(character);

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

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var clock = new THREE.Clock();
clock.start();

var render = function() {
  var time = clock.getElapsedTime();

  camera.position.set(0, 0, 50);

  rightArm.rotation.z = 2 * Math.cos(0.6662 * time * 10 + Math.PI);
  rightArm.rotation.x = 1 * (Math.cos(0.2812 * time * 10) - 1);
  leftArm.rotation.z = 2 * Math.cos(0.6662 * time * 10);
  leftArm.rotation.x = 1 * (Math.cos(0.2312 * time * 10) + 1);

  rightLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10);
  leftLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10 + Math.PI);

  character.rotation.y = time;

  renderer.render(scene, camera);
  requestAnimationFrame(render, renderer.domElement);
};

// Load resources
charMaterial.map = THREE.ImageUtils.loadTexture('assets/img/char.png', {}, render);
charMaterial.map.magFilter = THREE.NearestFilter;

},{"./shim/request-animation-frame.js":2,"./util.js":5,"three":"5bCyGh"}],2:[function(require,module,exports){
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

var requestAnimationFrameShim = window.requestAnimationFrame;
var cancelAnimationFrameShim = window.cancelAnimationFrame;

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !requestAnimationFrameShim; ++x) {
  requestAnimationFrameShim = window[vendors[x] + 'RequestAnimationFrame'];
  cancelAnimationFrameShim = window[vendors[x] + 'CancelAnimationFrame'] ||
                             window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (requestAnimationFrameShim) {
  requestAnimationFrameShim = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (cancelAnimationFrameShim) {
  cancelAnimationFrameShim = function(id) {
    clearTimeout(id);
  };
}

exports.requestAnimationFrame = requestAnimationFrameShim;
exports.cancelAnimationFrame = cancelAnimationFrameShim;

},{}],"5bCyGh":[function(require,module,exports){
module.exports = window.THREE;

},{}],"three":[function(require,module,exports){
module.exports=require('5bCyGh');
},{}],5:[function(require,module,exports){
var THREE = require('three');

exports.uvMapCubeToTexture = function(args) {
  return [
    args.front,
    args.back,
    args.top,
    args.bottom,
    args.right,
    args.left
  ].map(function(face) {
    // Calculate face vertices
    //   3 --- 2
    //   |     |
    //   0 --- 1
    return [
      new THREE.Vector2(face.x, face.y),
      new THREE.Vector2(face.x + face.width, face.y),
      new THREE.Vector2(face.x + face.width, face.y + face.height),
      new THREE.Vector2(face.x, face.y + face.height)
    ];
  }).map(function(faceVertices) {
    // Convert to UV space
    return faceVertices.map(function(faceVertex) {
      faceVertex.x /= args.textureWidth;
      faceVertex.y /= args.textureHeight;
      return faceVertex;
    });
  }).map(function(faceVertices) {
    // Triangulate quad
    return [
      [faceVertices[3], faceVertices[0], faceVertices[2]],
      [faceVertices[0], faceVertices[1], faceVertices[2]]
    ];
  }).reduce(function(result, arr) {
    // Concatenate to single array of triangles
    return result.concat(arr);
  });
};

},{"three":"5bCyGh"}]},{},[1])