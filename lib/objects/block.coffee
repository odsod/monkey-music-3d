THREE = require('three')
assets = require('../assets.coffee')
uvMapForCubeTexture = require('../util.coffee').uvMapForCubeTexture

textures =
  blocksmall: new THREE.Texture(assets.images.blocksmall)

for name, texture of textures
  texture.magFilter = THREE.NearestFilter
  texture.needsUpdate = true

blockMaterial = new THREE.MeshBasicMaterial(map: textures.blocksmall)
blockGeometry = new THREE.CubeGeometry(1, 0.50, 1)
blockGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0))
blockGeometry.faceVertexUvs[0] = uvMapForCubeTexture
  right:  { x: 0, y: 8, width: 8, height: 8 }
  front:  { x: 0, y: 8, width: 8, height: 8 }
  left:   { x: 0, y: 8, width: 8, height: 8 }
  back:   { x: 0, y: 8, width: 8, height: 8 }
  top:    { x: 0, y: 0, width: 8, height: 8 }
  bottom: { x: 0, y: 0, width: 8, height: 8 }
  textureWidth: 8
  textureHeight: 16

class Block extends THREE.Object3D
  constructor: ->
    super()
    @add(new THREE.Mesh(blockGeometry, blockMaterial))

module.exports = Block
