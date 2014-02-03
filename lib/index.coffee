assets = require('./assets.coffee')
TWEEN = require('tween')
MonkeyMusicReplay = require('./monkey-music-replay.coffee').MonkeyMusicReplay
requestAnimationFrame = require('./shim/request-animation-frame.js')

replayFile = require('../levels/testlevel.replay.json')

assets.whenLoaded ->
  replay = new MonkeyMusicReplay(replayFile, stepTime: 0.8, autoStart: true)
  document.body.appendChild(replay.renderer.domElement)

  window.addEventListener 'keyup', (e) -> if e.keyCode is 32
    if replay.running then replay.stop() else replay.start()

  renderLoop = ->
    TWEEN.update()
    replay.update()
    requestAnimationFrame(renderLoop, replay.renderer.domElement)
  requestAnimationFrame(renderLoop, replay.renderer.domElement)
