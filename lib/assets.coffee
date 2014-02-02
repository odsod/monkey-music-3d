needsToLoad = 0
callbacks = []

exports.whenLoaded = (callback) ->
  if needsToLoad is 0 then callback() else callbacks.push(callback)

notifyLoaded = ->
  if --needsToLoad is 0
    callback() for callback in callbacks
    callbacks = []

imageFiles = [
  'assets/images/monkey.png'
  'assets/images/blocksmall.png'
  'assets/images/platinumrecord.png'
  'assets/images/goldrecord.png'
  'assets/images/record.png'
]

filename = (src) -> src.split('/').pop().split('.')[0]

exports.images = imageFiles.reduce (images, src) ->
  needsToLoad++
  image = new Image()
  image.addEventListener('load', notifyLoaded)
  image.src = src
  images[filename(src)] = image
  images
, {}
