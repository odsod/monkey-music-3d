THREE = require('three')
Terrain = require('./objects/terrain.coffee').Terrain

class MonkeyMusicReplay

  #@ENTITY_CONSTRUCTORS =
    #monkey: Monkey
    #record: Item.type('record')
    #goldrecord: Item.type('goldrecord')
    #platinumrecord: Item.type('platinumrecord')

  @STEP_TIME: 1000

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
    @camera.position.set(1, 1, 1)
    @camera.position.setLength(5)
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

      #if not entityOnScene?
        #Entity = @ENTITY_CONSTRUCTORS[@legend.entities[id]]
        #entitiyOnScene = @entitiesOnScene[id] = new Entity(id: id, entities: @entitiesOnScene, stepTime: @STEP_TIME)
        #@scene.add(entityOnScene)
      #if (not entityOnScene.position.x is x) or (not entityOnScene.position.z is z)
        #entityOnScene.position.set(x, 0, z)
    #for id, entity of @entitiesOnScene
      #if not entitiesUpdated[id]?
        #@entitiesOnScene.splice(@entitiesOnScene.indexOf(entity), 1)
    #entity.resetActions() for entity in @entitiesOnScene
    #for id, action in actions
      #@entitiesOnScene[id].performAction(action)

  updateAndRender: =>
    currDelta = @clock.getDelta()
    currTime = @clock.getElapsedTime()
    currStepNum = currTime / @STEP_TIME
    @initStep(currStepNum) if currStepNum > @stepNum
    entity.animate(currTime, currDelta) for entity in @entitiesOnScene
    @renderer.render(@scene, @camera)

exports.MonkeyMusicReplay = MonkeyMusicReplay
