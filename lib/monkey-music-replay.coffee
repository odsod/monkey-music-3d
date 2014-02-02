THREE = require('three')
Terrain = require('./objects/terrain.coffee').Terrain
Monkey = require('./objects/monkey.coffee').Monkey
items = require('./objects/items.coffee')

assets = require('./assets.coffee')

STEP_TIME = 0.750

class MonkeyMusicReplay

  constructor: (options) ->
    {@steps, @legend} = options
    aspectRatio = window.innerWidth/ window.innerHeight
    @camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 1500)
    @clock = new THREE.Clock()
    @renderer = new THREE.WebGLRenderer()
    @scene = new THREE.Scene()
    @entitiesOnScene = {}
    @init()

  init: =>
    @initStep(0)
    @renderer.setClearColor(0x0f1113)
    @renderer.setSize(window.innerWidth, window.innerHeight)
    @renderer.sortObjects = false
    @camera.position.set(4.5, 5, 7 + 1)
    @camera.lookAt(new THREE.Vector3(4.5, 0, 3.5))

    # Floor
    floorGeometry = new THREE.PlaneGeometry(10, 7)
    floorMaterial = new THREE.MeshBasicMaterial({ color: 0x987654 })
    floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = - Math.PI / 2
    floor.position.x = 4.5
    floor.position.z = 3
    @scene.add(floor)

    terrain = Terrain.fromLayout(@steps[0].layout, @legend.terrain)
    @scene.add(terrain)

  initStep: (@stepNum) =>
    {layout, actions} = @steps[@stepNum]
    entitiesUpdated = {}
    layout.forEach (row, z) => row.forEach (id, x) =>
      if id of @legend.entities

        # Mark entity as updated
        entitiesUpdated[id] = true
        entityOnScene = @entitiesOnScene[id]

        if not entityOnScene?
          entityOnScene = @entitiesOnScene[id] =
            items.voxelObjectFor @legend.entities[id],
              id: id
              entities: @entitiesOnScene
              stepTime: STEP_TIME
          @scene.add(entityOnScene)

        if (entityOnScene.position.x != x) or (entityOnScene.position.z != z)
          entityOnScene.position.set(x, 0, z)

    for id, entity of @entitiesOnScene
      if not entitiesUpdated[id]?
        @scene.remove(entity)
        delete @entitiesOnScene[id]

    for id, entity of @entitiesOnScene
      entity.resetActions()
    @entitiesOnScene[action.id].performAction(action) for action in actions

  updateAndRender: =>
    currDelta = @clock.getDelta()
    currTime = @clock.getElapsedTime()
    currStepNum = Math.floor(currTime / STEP_TIME)
    if currStepNum > @stepNum and currStepNum < @steps.length
      @initStep(currStepNum)
    for id, entity of @entitiesOnScene
      entity.animate(currTime, currDelta)
    @renderer.render(@scene, @camera)

exports.MonkeyMusicReplay = MonkeyMusicReplay
