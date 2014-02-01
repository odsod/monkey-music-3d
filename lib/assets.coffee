uvMapForCubeTexture = require('./util.coffee').uvMapForCubeTexture
VoxelObject = require('./objects/voxel-object.coffee').VoxelObject

class LoadCounter
  constructor: ->
    @callbacks = []
    @needsToLoad = 0
  increment: => @needsToLoad += 1
  notifyLoaded: =>
    if --@needsToLoad == 0
      callback() for callback in @callbacks
      @callbacks = []
  whenLoaded: (callback) =>
    if @needsToLoad == 0
      callback()
    else @callbacks.push(callback)

textureFiles = [
  'monkey.png'
  'blocksmall.png'
]

imageFiles = [
  'platinumrecord.png'
  'goldrecord.png'
  'record.png'
]

assetsToLoad = new LoadCounter()
filename = (src) -> src.split('/').pop().split('.')[0]

exports.textures = textureFiles
  .map((src) -> "assets/textures/#{src}")
  .reduce (textures, src) ->
    assetsToLoad.increment()
    texture = new THREE.ImageUtils.loadTexture(src, null, assetsToLoad.notifyLoaded)
    texture.magFilter = THREE.NearestFilter
    texture.needsUpdate = true
    textures[filename(src)] = texture
    textures
  , {}

exports.images = imageFiles
  .map((src) -> "assets/items/#{src}")
  .reduce (images, src) ->
    assetsToLoad.increment()
    image = new Image()
    image.addEventListener 'load', -> assetsToLoad.notifyLoaded()
    image.src = src
    images[filename(src)] = image
    images
  , {}

exports.whenLoaded = assetsToLoad.whenLoaded
