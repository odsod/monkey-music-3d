THREE = require('three')

assets = require('./assets.coffee')
objects = require('./objects/items.coffee')
Engine = require('monkey-music-engine')

STEP_TIME = 0.750

class MonkeyMusicReplay

  constructor: (replay) ->
    @engine = new Engine(replay.level)
    @steps = replay.steps

    @objectsOnScene = {}
    @stepNum = -1

    @clock = new THREE.Clock()
    @scene = new THREE.Scene()

    # Renderer
    @renderer = new THREE.WebGLRenderer()
    @renderer.setClearColor(0x0f1113)
    @renderer.setSize(window.innerWidth, window.innerHeight)
    @renderer.sortObjects = false

    # Camera
    aspectRatio = window.innerWidth/ window.innerHeight
    @camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 1500)
    @camera.position.set(1, 1, 1)
    @camera.position.setLength(10)
    @camera.lookAt(new THREE.Vector3(0, 0, 0))

    @cleanRemovedObjectsFromScene()
    @addNewObjectsToScene()
    @updateObjectPositions()

  addNewObjectsToScene: ->
    for row, y in @engine.ids
      for id, x in row
        unless id of @objectsOnScene
          objectType = @engine.idLookup[id]
          if objects.canCreate(objectType)
            object = objects.create(objectType)
            @scene.add(object)
            @objectsOnScene[id] = object

  cleanRemovedObjectsFromScene: ->
    onScene = {}
    for row in @engine.ids
      for id in row
        onScene[id] = true
    for id, object of @objectsOnScene
      if not onScene[id]
        delete @objectsOnScene[id]
        @scene.remove(object)

  updateObjectPositions: ->
    for row, y in @engine.ids
      for id, x in row
        if id of @objectsOnScene
          @objectsOnScene[id].position.set(x, 0, y)

  updateAndRender: =>
    currDelta = @clock.getDelta()
    currTime = @clock.getElapsedTime()

    currStepNum = Math.floor(currTime / STEP_TIME)
    if currStepNum > @stepNum and currStepNum < @steps.length
      step = @steps[currStepNum]
      @engine.step(step)
      @cleanRemovedObjectsFromScene()
      @addNewObjectsToScene()
      @updateObjectPositions()
      @stepNum = currStepNum

    @renderer.render(@scene, @camera)

exports.MonkeyMusicReplay = MonkeyMusicReplay
