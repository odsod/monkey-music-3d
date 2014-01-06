var parseLayout = function(jsonLayout) {
  return jsonLayout.map(function(row) {
    return row.split('');
  });
};

var Level = function() {

};

Level.fromJSON = function(json) {
  var level = new Level();
  level.layout = parseLayout(json.layout);
  level.legend = json.legend;
  return level;
};

Level.prototype.createTerrain = function() {
  var terrainGeometry = this.layout.reduce(function(terrainGeometry, row, y) {
    return row.reduce(function(terrainGeometry, token, x) {
      return terrainGeometry();
    }, terrainGeometry);
  }, new THREE.Geomtery());
  return new THREE.Mesh(terrainGeometry, terrainMaterial);
};


Level.prototype.forEachTokenInLegend = function(legend, callback) {
  this.layout.forEach(function(row, y) {
    row.forEach(function(token, x) {
      if (legend[token]) {
        callback(legend[token], x, y);
      }
    });
  });
};
