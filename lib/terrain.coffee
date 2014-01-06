THREE = require('three')
assets = require('./assets.js')
uvMapCubeToTexture = require('./util.js').uvMapCubeToTexture

blockMaterial = new THREE.MeshBasicMaterial(map: assets.textures.blocksmall)
blockGeometry = new THREE.CubeGeometry(1, 1, 1)
blockGeometry.faceVertexUvs[0] = uvMapCubeToTexture
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
    blockMesh.position.set(0, 0.5, 0)
    THREE.GeometryUtils.merge(geometry, blockMesh)
    return new Terrain(geometry)

exports.Terrain = Terrain
