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
    callback();
  } else {
    listeners.push(callback);
  }
};

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
  var name = src.split('/').pop().split('.')[0];
  texturesMap[name] = texture;

  return texturesMap;
}, {});
