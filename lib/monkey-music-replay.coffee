THREE = require('three')
Terrain = require('./objects/terrain.coffee').Terrain
Monkey = require('./objects/monkey.coffee').Monkey
items = require('./objects/items.coffee')

assets = require('./assets.coffee')

STEP_TIME = 1

class MonkeyMusicReplay

  constructor: (options) ->
    {@steps, @legend} = options
    @camera = new THREE.PerspectiveCamera(70, window.innerWidth/ window.innerHeight, 0.1, 1500)
    @clock = new THREE.Clock()
    @renderer = new THREE.WebGLRenderer()
    @scene = new THREE.Scene()
    @entitiesOnScene = {}

  init: =>
    @initStep(0)
    @renderer.setClearColor(0xffffff)
    @renderer.setSize(window.innerWidth, window.innerHeight)
    @renderer.sortObjects = false
    #@camera.position.set(1, 3, 2)
    #@camera.lookAt(new THREE.Vector3(1, 0, 0))
    @camera.position.set(1, 1, 1)
    @camera.position.setLength(10)
    @camera.lookAt(new THREE.Vector3(0, 0, 0))
    @scene.add(new THREE.AxisHelper(300))
    terrain = Terrain.fromLayout(@steps[0].layout, @legend.terrain)
    @scene.add(terrain)

  initStep: (@stepNum) =>
    {layout, actions} = @steps[@stepNum]
    entitiesUpdated = {}
    layout.forEach (row, z) => row.forEach (id, x) => if id of @legend.entities
      # Mark entity as updated
      entitiesUpdated[id] = true
      entityOnScene = @entitiesOnScene[id]

      if not entityOnScene?
        Entity = 
          if (id == '1')
            Monkey 
          else items.constructorForType('record')
        entityOnScene = @entitiesOnScene[id] = new Entity(id: id, entities: @entitiesOnScene, stepTime: @STEP_TIME)
        @scene.add(entityOnScene)

      if (entityOnScene.position.x != x) or (entityOnScene.position.z != z)
        entityOnScene.position.set(x, 0, z)

    for id, entity of @entitiesOnScene
      if not entitiesUpdated[id]?
        @scene.remove(entity)
        delete @entitiesOnScene[id]

    #entity.resetActions() for entity in @entitiesOnScene
    @entitiesOnScene[action.id].performAction(action) for action in actions

  updateAndRender: =>
    currDelta = @clock.getDelta()
    currTime = @clock.getElapsedTime()
    currStepNum = Math.floor(currTime / STEP_TIME)
    @initStep(currStepNum) if currStepNum > @stepNum and currStepNum < @steps.length
    for id, entity of @entitiesOnScene
      entity.animate(currTime, currDelta)
    @renderer.render(@scene, @camera)

exports.MonkeyMusicReplay = MonkeyMusicReplay
