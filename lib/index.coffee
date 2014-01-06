assets = require('./assets.coffee')
MonkeyMusicReplay = require('./monkey-music-replay.coffee').MonkeyMusicReplay
requestAnimationFrame = require('./shim/request-animation-frame.js').requestAnimationFrame

replayFile = require('../levels/demo.replay.json');

replay = new MonkeyMusicReplay(replayFile)

renderLoop = ->
  replay.updateAndRender()
  requestAnimationFrame(renderLoop, replay.renderer.domElement)

assets.whenLoaded ->
  replay.init()
  document.body.appendChild(replay.renderer.domElement)
  renderLoop()
