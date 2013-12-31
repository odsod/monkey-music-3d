var THREE = require('three');

var assets = require('../assets.js');

var canvas = document.createElement('canvas');

var itemModels = {};

var createItem = function(name) {
  var image = assets.items[name];

  canvas.width = image.width;
  canvas.height = image.height;
  canvas.drawImage(image, 0, 0);

  var imageData = canvas.getContext('2d').getImageData(0, 0, image.width, image.height);

  console.log(imageData);

  var itemGeometry = new THREE.Geometry();
  var item = new THREE.Mesh();
  itemModels[name] = item;
  return item;
};

exports.getItem = function(name) {
  if (itemModels[name]) {
    return itemModels[name].clone();
  } else {
    return createItem(name);
  }
};
