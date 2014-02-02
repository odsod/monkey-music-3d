assets = require('./assets.coffee')
TWEEN = require('tween')
MonkeyMusicReplay = require('./monkey-music-replay.coffee').MonkeyMusicReplay
requestAnimationFrame = require('./shim/request-animation-frame.js')

replayFile = require('../levels/testlevel.replay.json')

assets.whenLoaded ->
  replay = new MonkeyMusicReplay(replayFile, stepTime: 1)
  document.body.appendChild(replay.renderer.domElement)

  renderLoop = ->
    TWEEN.update()
    replay.updateAndRender()
    requestAnimationFrame(renderLoop, replay.renderer.domElement)
  requestAnimationFrame(renderLoop, replay.renderer.domElement)
