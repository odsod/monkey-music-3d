THREE = require('three')
Terrain = require('./objects/terrain.coffee').Terrain
Monkey = require('./objects/monkey.coffee').Monkey
items = require('./objects/items.coffee')

assets = require('./assets.coffee')

STEP_TIME = 0.750

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
    @renderer.setClearColor(0x0f1113)
    @renderer.setSize(window.innerWidth, window.innerHeight)
    @renderer.sortObjects = false
    #@camera.position.set(1, 3, 2)
    #@camera.lookAt(new THREE.Vector3(1, 0, 0))
    @camera.position.set(4.5, 5, 7 + 1)
    #@camera.position.setLength(100)
    @camera.lookAt(new THREE.Vector3(4.5, 0, 3.5))
    #@scene.add(new THREE.AxisHelper(300))
    plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 7), new THREE.MeshBasicMaterial({ color: 0x987654 }))
    plane.rotation.x = - Math.PI / 2
    plane.position.x = 4.5
    plane.position.z = 3
    @scene.add(plane)
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
          Entity = 
            if (id == '1' or id == '2')
              Monkey
            else if (id in ['5', '6']) then items.constructorForType('goldrecord')
            else if (id in ['7', '8', '9']) then items.constructorForType('platinumrecord')
            else items.constructorForType('record')
          entityOnScene = @entitiesOnScene[id] = new Entity(id: id, entities: @entitiesOnScene, stepTime: @STEP_TIME)
          console.log(id, @legend.entities[id], entityOnScene)
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
    @initStep(currStepNum) if currStepNum > @stepNum and currStepNum < @steps.length
    for id, entity of @entitiesOnScene
      entity.animate(currTime, currDelta)
    @renderer.render(@scene, @camera)

exports.MonkeyMusicReplay = MonkeyMusicReplay
