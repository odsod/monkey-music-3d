THREE = require('three')

assets = require('../assets.coffee')

exports.constructorForType = (type) ->
  numItems = 0
  class ItemObject extends THREE.Object3D

    constructor: (options) ->
      super()
      {@id} = options
      @add(assets.items[type].clone())

    animate: (time, delta) =>
      @rotation.y = time + (Math.PI / 3) * @id

    resetActions: () ->
