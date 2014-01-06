THREE = require('three')

exports.uvMapForCubeTexture = (args) ->
  [args.front, args.back, args.top, args.bottom, args.right, args.left]
  .map (face) ->
    # Calculate face vertices
    #   3 --- 2
    #   |     |
    #   0 --- 1
    [ new THREE.Vector2(face.x, face.y)
      new THREE.Vector2(face.x + face.width, face.y)
      new THREE.Vector2(face.x + face.width, face.y + face.height)
      new THREE.Vector2(face.x, face.y + face.height) ]
  .map (faceVertices) ->
    # Convert to UV space
    faceVertices.map (faceVertex) ->
      faceVertex.x /= args.textureWidth
      faceVertex.y /= args.textureHeight
      faceVertex
  .map (faceVertices) ->
    [ [faceVertices[3], faceVertices[0], faceVertices[2]]
      [faceVertices[0], faceVertices[1], faceVertices[2]] ]
  .reduce (result, arr) -> result.concat(arr)
