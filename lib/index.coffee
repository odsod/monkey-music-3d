assets = require('./assets.coffee')
TWEEN = require('tween')
MonkeyMusicReplay = require('./monkey-music-replay.coffee').MonkeyMusicReplay
requestAnimationFrame = require('./shim/request-animation-frame.js').requestAnimationFrame

replayFile = require('../levels/demo2.replay.json');

replay = new MonkeyMusicReplay(replayFile)

renderLoop = ->
  TWEEN.update()
  replay.updateAndRender()
  requestAnimationFrame(renderLoop, replay.renderer.domElement)

assets.whenLoaded ->
  replay.init()
  document.body.appendChild(replay.renderer.domElement)
  renderLoop()
