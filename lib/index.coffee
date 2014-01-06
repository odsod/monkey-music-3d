assets = require './assets'
MonkeyMusicReplay = require('./monkey-music-replay.coffee').MonkeyMusicReplay
requestAnimationFrame = require('./shim/request-animation-frame.js').requestAnimationFrame

replay = new MonkeyMusicReplay(steps: [{}], legend: {})

renderLoop = ->
  replay.updateAndRender()
  requestAnimationFrame(renderLoop)

assets.whenLoaded ->
  replay.init()
  document.body.appendChild(replay.renderer.domElement)
  renderLoop()
