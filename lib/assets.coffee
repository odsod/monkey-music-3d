needsToLoad = 0
callbacks = []

exports.whenLoaded = (callback) ->
  if needsToLoad is 0 then callback() else callbacks.push(callback)

notifyLoaded = ->
  if --needsToLoad is 0
    callback() for callback in callbacks
    callbacks = []

imageFiles = [
  'monkey.png'
  'blocksmall.png'
  'platinumrecord.png'
  'goldrecord.png'
  'record.png'
]

filename = (src) -> src.split('/').pop().split('.')[0]

exports.images = imageFiles
  .map((src) -> "assets/images/#{src}")
  .reduce (images, src) ->
    needsToLoad++
    image = new Image()
    image.addEventListener('load', notifyLoaded)
    image.src = src
    images[filename(src)] = image
    images
  , {}
