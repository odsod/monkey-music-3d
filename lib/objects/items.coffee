assets = require('../assets.coffee')
VoxelObject = require('../objects/voxel-object.coffee').VoxelObject
Monkey = require('./monkey.coffee').Monkey
Block = require('./terrain.coffee').Block

exports.create = (thing, options) -> switch thing
  when 'Player' then new Monkey(options)
  when 'Wall' then new Block(options)
  when 'Record' then new VoxelObject(assets.images.record)
  when 'GoldRecord' then new VoxelObject(assets.images.goldrecord)
  when 'PlatinumRecord' then new VoxelObject(assets.images.platinumrecord)

exports.canCreate = (thing) -> switch thing
  when 'Player', 'Wall', 'Record', 'GoldRecord', 'PlatinumRecord' then yes
  else no
