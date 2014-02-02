THREE = require('three')
items = require('./objects/items.coffee')

assets = require('./assets.coffee')

Engine = require('monkey-music-engine')
replay = require('../levels/testlevel.replay.json')

console.log(replay)

STEP_TIME = 0.750

class MonkeyMusicReplay

  constructor: (options) ->
    @level = replay.level
    {@steps, @legend} = options
    @objectsOnScene = {}

    @clock = new THREE.Clock()
    @scene = new THREE.Scene()

    # Renderer
    @renderer = new THREE.WebGLRenderer()
    @renderer.setClearColor(0x0f1113)
    @renderer.setSize(window.innerWidth, window.innerHeight)
    @renderer.sortObjects = false

    # Floor
    height = options.steps[0].layout.length
    width = options.steps[0].layout[0].length
    floorGeometry = new THREE.PlaneGeometry(width, height)
    floorMaterial = new THREE.MeshBasicMaterial({ color: 0x987654 })
    floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = - Math.PI / 2
    floor.position.x = width / 2 - 0.5
    floor.position.z = height / 2 - 0.5
    @scene.add(floor)

    # Camera
    aspectRatio = window.innerWidth/ window.innerHeight
    @camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 1500)
    @camera.position.set(width / 2 - 0.5, 5, height - 0.5 + height * 0.75)
    @camera.lookAt(new THREE.Vector3(width / 2 - 0.5, 0, height / 2 - 0.5))

    @initStep(0)

  shouldBeOnScene: (thing) -> switch thing
    when 'empty' then no
    else yes

  initStep: (@stepNum) =>
    {layout, actions} = @steps[@stepNum]

    entitiesUpdated = {}

    layout.forEach (row, z) => row.forEach (id, x) =>
      entity = @legend[id]
      if entity? and @shouldBeOnScene(entity)

        # Mark entity as updated
        entitiesUpdated[id] = true
        entityOnScene = @objectsOnScene[id]

        if not entityOnScene?
          entityOnScene = @objectsOnScene[id] =
            items.voxelObjectFor entity,
              id: id
              entities: @objectsOnScene
              stepTime: STEP_TIME
          @scene.add(entityOnScene)

        if (entityOnScene.position.x != x) or (entityOnScene.position.z != z)
          entityOnScene.position.set(x, 0, z)

    for id, entity of @objectsOnScene
      if not entitiesUpdated[id]?
        @scene.remove(entity)
        delete @objectsOnScene[id]

    for id, entity of @objectsOnScene
      entity.resetActions()
    @objectsOnScene[action.id].performAction(action) for action in actions

  updateAndRender: =>
    currDelta = @clock.getDelta()
    currTime = @clock.getElapsedTime()
    currStepNum = Math.floor(currTime / STEP_TIME)

    if currStepNum > @stepNum and currStepNum < @steps.length
      @initStep(currStepNum)

    for id, entity of @objectsOnScene
      entity.animate(currTime, currDelta)

    @renderer.render(@scene, @camera)

exports.MonkeyMusicReplay = MonkeyMusicReplay
