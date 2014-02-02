assets = require('../assets.coffee')
VoxelObject = require('../objects/voxel-object.coffee').VoxelObject
Monkey = require('./monkey.coffee').Monkey
Block = require('./terrain.coffee').Block

exports.voxelObjectFor = (thing, options) -> switch thing
  when 'monkey' then new Monkey(options)
  when 'wall' then new Block(options)
  when 'record' then new VoxelObject(assets.images.record)
  when 'goldrecord' then new VoxelObject(assets.images.goldrecord)
  when 'platinumrecord' then new VoxelObject(assets.images.platinumrecord)
