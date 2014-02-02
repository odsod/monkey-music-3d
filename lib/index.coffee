assets = require('./assets.coffee')
TWEEN = require('tween')
MonkeyMusicReplay = require('./monkey-music-replay.coffee').MonkeyMusicReplay
requestAnimationFrame = require('./shim/request-animation-frame.js')

replayFile = require('../levels/demo3.replay.json')

assets.whenLoaded ->
  replay = new MonkeyMusicReplay(replayFile)
  document.body.appendChild(replay.renderer.domElement)

  renderLoop = ->
    TWEEN.update()
    replay.updateAndRender()
    requestAnimationFrame(renderLoop, replay.renderer.domElement)
  requestAnimationFrame(renderLoop, replay.renderer.domElement)
