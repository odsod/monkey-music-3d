THREE = require('three')

assets = require('./assets.coffee')
objectFactory = require('./objects/factory.coffee')

class MonkeyMusicReplay

  constructor: (replay, options) ->
    {@stepTime, @autoStart} = options
    @engine = new Engine(replay.level)
    @steps = replay.steps

    @objectsOnScene = {}
    @tick = 0
    @stepNum = -1

    @clock = new THREE.Clock()
    @running = @autoStart

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
    @renderer.render(@scene, @camera)

  start: =>
    @clock.start()
    @running = true

  stop: =>
    @clock.stop()
    @running = false

  setStepTime: (@stepTime) =>
    object.setStepTime?(@stepTime) for id, object of @objectsOnScene

  addNewObjectsToScene: ->
    for row, y in @engine.ids
      for id, x in row
        unless id of @objectsOnScene
          objectType = @engine.idLookup[id]
          if objectFactory.canCreate(objectType)
            object = objectFactory.create(objectType, stepTime: @stepTime)
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

  update: => if @running
    currDelta = @clock.getDelta()
    currTime = @clock.getElapsedTime()

    currStepNum = Math.floor(currTime / @stepTime)

    # We have advanced to the next step
    if currStepNum > @stepNum
      @stepNum = currStepNum

      # Snap to current state (animations should have brought us here)
      @cleanRemovedObjectsFromScene()
      @addNewObjectsToScene()
      @updateObjectPositions()

      # Is there a next step?
      if currStepNum < @steps.length

        # Animate the transition to the next step
        step = @steps[currStepNum]

        object.resetAnimations?() for id, object of @objectsOnScene

        for animation in @engine.animationsForStep(step)
          @objectsOnScene[animation.id].performAnimation(animation)

        # Move to next step
        @engine.step(step)

    # Perform ongoing animations
    for id, object of @objectsOnScene
      object.animate?(currTime, currDelta)

    @renderer.render(@scene, @camera)

exports.MonkeyMusicReplay = MonkeyMusicReplay
