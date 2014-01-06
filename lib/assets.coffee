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

itemFiles = [
  'platinumrecord.png'
  'goldrecord.png'
  'record.png'
]

assetsToLoad = new LoadCounter()
filename = (src) -> src.split('/').pop().split('.')[0]

exports.textures = textureFiles
  .map((src) -> "assets/textures/#{src}")
  .reduce (textureFiles, src) ->
    assetsToLoad.increment()
    texture = new THREE.ImageUtils.loadTexture(src, null, assetsToLoad.notifyLoaded)
    texture.magFilter = THREE.NearestFilter
    texture.needsUpdate = true
    textureFiles[filename(src)] = texture
    textureFiles
  , {}

exports.items = itemFiles
  .map((src) -> "assets/items/#{src}")
  .reduce (itemsMap, src) ->
    itemsMap
  , {}

exports.whenLoaded = assetsToLoad.whenLoaded
