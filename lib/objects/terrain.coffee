THREE = require('three')
assets = require('../assets.coffee')
uvMapForCubeTexture = require('../util.coffee').uvMapForCubeTexture

blockMaterial = new THREE.MeshBasicMaterial(map: assets.textures.blocksmall)
blockGeometry = new THREE.CubeGeometry(1, 0.75, 1)
blockGeometry.faceVertexUvs[0] = uvMapForCubeTexture
  right:  { x: 0, y: 8, width: 8, height: 8 }
  front:  { x: 0, y: 8, width: 8, height: 8 }
  left:   { x: 0, y: 8, width: 8, height: 8 }
  back:   { x: 0, y: 8, width: 8, height: 8 }
  top:    { x: 0, y: 0, width: 8, height: 8 }
  bottom: { x: 0, y: 0, width: 8, height: 8 }
  textureWidth: 8
  textureHeight: 16
blockMesh = new THREE.Mesh(blockGeometry, blockMaterial)

class Terrain extends THREE.Object3D
  constructor: (geometry) ->
    super()
    @add(new THREE.Mesh(geometry, blockMaterial))

  @fromLayout: (layout, legend) ->
    geometry = new THREE.Geometry()
    layout.forEach (row, z) -> row.forEach (id, x) ->
      if id of legend
        blockMesh.position.set(x, 0.5, z)
        THREE.GeometryUtils.merge(geometry, blockMesh)
    return new Terrain(geometry)

exports.Terrain = Terrain
