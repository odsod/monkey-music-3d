assets = require('../assets.coffee')
VoxelObject = require('../objects/voxel-object.coffee').VoxelObject
Monkey = require('./monkey.coffee').Monkey

exports.voxelObjectFor = (thing, options) -> switch thing
  when 'monkey' then new Monkey(options)
  else new VoxelObject(assets.images[thing])
