var THREE = require('three');

var assets = require('../assets.js');

exports.createObject = function(name) {
  var item = assets.items[name].clone();
  item.scale.setLength(2.5);
  return item;
};
