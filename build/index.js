require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./model/character.js":2,"./shim/request-animation-frame.js":3,"./textures.js":6,"./util.js":7,"three":"5bCyGh"}],2:[function(require,module,exports){
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

},{"../textures.js":6,"../util.js":7,"three":"5bCyGh"}],3:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
var images = {};
images['monkey'] = new Image();
images['monkey'].src = 'data:image/png;base64,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';
exports['monkey'] = new THREE.Texture(images['monkey']);
exports['monkey'].needsUpdate = true;
exports['monkey'].magFilter = THREE.NearestFilter;
images['skin'] = new Image();
images['skin'].src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAMAAACVQ462AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAHxALIxcJJBgIJBgKJhgLJhoKJxsLJhoMKBsKKBsLKBoNKBwLKRwMKh0NKx4NKx4OLR0OLB4OLx8PLB4RLyANLSAQLyIRMiMQMyQRNCUSOigUPyoVKCgoPz8/JiFbMChyAFtbAGBgAGhoAH9/Qh0KQSEMRSIOQioSUigmUTElYkMvbUMqb0UsakAwdUcvdEgvek4za2trOjGJUj2JRjqlVknMAJmZAJ6eAKioAK+vAMzMikw9gFM0hFIxhlM0gVM5g1U7h1U7h1g6ilk7iFo5j14+kF5Dll9All9BmmNEnGNFnGNGmmRKnGdIn2hJnGlMnWpPlm9bnHJcompHrHZaqn1ms3titXtnrYBttIRttolsvohst4Jyu4lyvYtyvY5yvY50xpaA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPSUN6AAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAKjSURBVEhLpZSLVtNAEIYLpSlLSUITLCBaGhNBQRM01M2mSCoXNUURIkZFxQvv/wz6724Wij2HCM7J6UyS/b+dmZ208rsww6jiqo4FhannZb5yDqjaNgDVwE/8JAmCMqF6fwGwbU0CKjD/+oAq9jcM27gxAFpNQxU3Bwi9Ajy8fgmGZuvaGAcIuwFA12CGce1jJESr6/Ot1i3Tnq5qptFqzet1jRA1F2XHWQFAs3RzwTTNhQd3rOkFU7c0DijmohRg1TR9ZmpCN7/8+PX954fb+sTUjK7VLKOYi1IAaTQtUrfm8pP88/vTw8M5q06sZoOouSgHEDI5vrO/eHK28el04yxf3N8ZnyQooZiLfwA0arNb6d6bj998/+vx8710a7bW4E2Uc1EKsEhz7WiQBK9eL29urrzsB8ngaK1JLDUXpYAkGSQH6e7640fL91dWXjxZ33138PZggA+Sz0WQlAL4gmewuzC1uCenqXevMPWc9XrMX/VXh6Hicx4ByHEeAfRg/wtgSMAvz+CKEkYAnc5SpwuD4z70PM+hUf+4348ixF7EGItjxmQcCx/Dzv/SOkuXAF3PdT3GIujjGLELNYwxhF7M4oi//wsgdlYZdMXCmEUUSsSu0OOBACMoBTiu62BdRPEjYxozXFyIpK7IAE0IYa7jOBRqGlOK0BFq3Kdpup3DthFwP9QDlBCGKEECoHEBEDLAXHAQMQnI8jwFYRQw3AMOQAJoOADoAVcDAh0HZAKQZUMZdC43kdeqAPwUBEsC+M4cIEq5KEEBCl90mR8CVR3nxwCdBBS9OAe020UGnXb7KcxzPY9SXoEEIBZtgE7UDgBKyLMhgBS2YdzjMJb4XHRDAPiQhSGjNOxKQIZTgC8BiMECgarxprjjO0OXiV4MAf4A/x0nbcyiS5EAAAAASUVORK5CYII=';
exports['skin'] = new THREE.Texture(images['skin']);
exports['skin'].needsUpdate = true;
exports['skin'].magFilter = THREE.NearestFilter;
},{}],7:[function(require,module,exports){
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