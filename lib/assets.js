var THREE = require('three');

var uvMapForCubeTexture = require('./util.coffee').uvMapForCubeTexture;

var listeners = [];

var needsToLoad = 0;
var onLoad = function() {
  needsToLoad -= 1;
  if (needsToLoad === 0) {
    listeners.forEach(function(listener) { listener(); });
    listeners = [];
  }
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
  'platinumrecord.png',
  'goldrecord.png',
  'record.png'
].map(function(src) {
  return 'assets/items/' + src;
}).reduce(function(itemsMap, src) {
  needsToLoad += 1;
  var image = new Image();
  image.addEventListener('load', function() {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    var itemGeometry = new THREE.Geometry();

    var texture = new THREE.Texture(image);
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;

    var material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      map: texture,
      shininess: 100
    });

    material.side = THREE.DoubleSide;

    var imageData = context.getImageData(0, 0, image.width, image.height).data;

    for (var x = 0; x < image.width; ++x) {
      for (var y = 0; y < image.height; ++y) {
        var i = (y * image.width + x) * 4;
        var alpha = imageData[i + 3];
        if (alpha !== 0) {
          var voxel = new THREE.CubeGeometry(1, 1, 1);
          voxel.faceVertexUvs[0] = uvMapForCubeTexture({
            right:  { x: x, y: y, width: 1, height: 1 },
            front:  { x: x, y: y, width: 1, height: 1 },
            left:  { x: x, y: y, width: 1, height: 1 },
            back:  { x: x, y: y, width: 1, height: 1 },
            top:  { x: x, y: y, width: 1, height: 1 },
            bottom:  { x: x, y: y, width: 1, height: 1 },
            textureWidth: image.width,
            textureHeight: image.height
          });
          var mesh = new THREE.Mesh(voxel, material);
          mesh.position.set(x - 7.5, y, 0);
          THREE.GeometryUtils.merge(itemGeometry, mesh);
        }
        var item = new THREE.Mesh(itemGeometry, material);
        itemsMap[getName(src)] = item;
      }
    }
    onLoad();
  });
  image.src = src;
  return itemsMap;
}, {});

exports.textures = [
  'monkey.png',
  'blocksmall.png',
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
