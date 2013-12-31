var THREE = require('three');

var listeners = [];

var needsToLoad = 0;
var onLoad = function() {
  needsToLoad -= 1;
  listeners.forEach(function(listener) { listener(); });
  listeners = [];
};

exports.whenLoaded = function(callback) {
  if (needsToLoad === 0) {
    setTimeout(callback, 0);
  } else {
    listeners.push(callback);
  }
};

var getName = function(src) {
  return src.split('/').pop().split('.')[0];
};

exports.items = [
  'track1.png'
].map(function(src) {
  return 'assets/items/' + src;
}).reduce(function(itemsMap, src) {
  needsToLoad += 1;
  var image = new Image();
  image.addEventListener('load', onLoad);
  itemsMap[getName(src)] = image;

}, {});

exports.textures = [
  'monkey.png',
  'block.png'
].map(function(src) {
  // Qualify paths
  return 'assets/textures/' + src;
}).reduce(function(texturesMap, src) {
  needsToLoad += 1;

  // Create texture
  var texture = THREE.ImageUtils.loadTexture(src, null, onLoad);
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  // Insert into mapping
  texturesMap[getName(src)] = texture;

  return texturesMap;
}, {});
