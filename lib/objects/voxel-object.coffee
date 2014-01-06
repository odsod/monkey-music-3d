THREE = require('three')
uvMapForCubeTexture = require('../util.coffee').uvMapForCubeTexture

class VoxelObject extends THREE.Object3D

  constructor: (geometry, material) ->
    super()
    @add(new THREE.Mesh(geometry, material))

  @fromImage: (image) ->
    canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    context = canvas.getContext('2d')
    context.drawImage(image, 0, 0)

    geometry = new THREE.Geometry()

    texture = new THREE.Texture(image)
    texture.magFilter = THREE.NearestFilter
    texture.needsUpdate = true

    material = new THREE.MeshBasicMaterial(map: texture)

    imageData = context.getImageData(0, 0, image.width, image.height).data

    for x in [0..image.width - 1]
      for y in [0..image.height - 1]
        i = (y * image.width + x) * 4
        alpha = imageData[i + 3]
        if alpha != 0
          voxel = new THREE.CubeGeometry(1, 1, 1)
          voxel.faceVertexUvs[0] = uvMapForCubeTexture
            right:  { x: x, y: y, width: 1, height: 1 }
            front:  { x: x, y: y, width: 1, height: 1 }
            left:   { x: x, y: y, width: 1, height: 1 }
            back:   { x: x, y: y, width: 1, height: 1 }
            top:    { x: x, y: y, width: 1, height: 1 }
            bottom: { x: x, y: y, width: 1, height: 1 }
            textureWidth: image.width,
            textureHeight: image.height
          mesh = new THREE.Mesh(voxel, material)
          mesh.position.set(x - 7.5, y, 0)
          THREE.GeometryUtils.merge(geometry, mesh)

    new VoxelObject(geometry, material)

exports.VoxelObject = VoxelObject
