THREE = require('three')
uvMapForCubeTexture = require('../util.coffee').uvMapForCubeTexture

getImageData = (image) ->
  canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)
  context.getImageData(0, 0, image.width, image.height).data

createVoxelMaterial = (image) ->
  texture = new THREE.Texture(image)
  texture.magFilter = THREE.NearestFilter
  texture.needsUpdate = true
  new THREE.MeshBasicMaterial(map: texture)

createVoxelGeometry = (image, material) ->
  imageData = getImageData(image)
  geometry = new THREE.Geometry()
  for x in [0..image.width - 1]
    for y in [0..image.height - 1]
      i = (y * image.width + x) * 4
      alpha = imageData[i + 3]
      continue if alpha == 0
      voxel = new THREE.CubeGeometry(1, 1, 1)
      currPixel = { x: x, y: y, width: 1, height: 1 }
      voxel.faceVertexUvs[0] = uvMapForCubeTexture
        right:  currPixel
        front:  currPixel
        left:   currPixel
        back:   currPixel
        top:    currPixel
        bottom: currPixel
        textureWidth: image.width,
        textureHeight: image.height
      mesh = new THREE.Mesh(voxel, material)
      mesh.position.set(x - Math.floor(image.width / 2), y, 0)
      THREE.GeometryUtils.merge(geometry, mesh)
  geometry

cache = {}

class ImageVoxelObject extends THREE.Object3D

  constructor: (image) ->
    super()

    {material, geometry} = cache[image.src] if image.src of cache
    unless material? and geometry?
      material = createVoxelMaterial(image)
      geometry = createVoxelGeometry(image, material)
      cache[image.src] = { material: material, geometry: geometry }

    @add(new THREE.Mesh(geometry, material))
    @scale.setLength(1 / image.width * 1.70)

  resetActions: ->
  animate: (time, delta) => @rotation.y = time + (Math.PI / 3) * @id

module.exports = ImageVoxelObject
