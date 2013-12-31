var THREE = require('three');

var itemCache = {};

exports.createObjectFromImage = function(image) {
  if (itemCache[image.src]) {
    return itemCache[image.src].clone();
  }

  var item = new THREE.Mesh();
  itemCache[image.src] = item;
  return item;
};
