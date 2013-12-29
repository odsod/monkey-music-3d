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
