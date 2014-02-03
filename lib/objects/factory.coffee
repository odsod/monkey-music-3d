assets = require('../assets.coffee')

ImageVoxelObject = require('./image-voxel-object.coffee')
Monkey = require('./monkey.coffee')
Block = require('./block.coffee')

exports.create = (thing, options) -> switch thing
  when 'Player' then new Monkey(options)
  when 'Wall' then new Block(options)
  when 'Record' then new ImageVoxelObject(assets.images.record)
  when 'GoldRecord' then new ImageVoxelObject(assets.images.goldrecord)
  when 'PlatinumRecord' then new ImageVoxelObject(assets.images.platinumrecord)

exports.canCreate = (thing) -> switch thing
  when 'Player', 'Wall', 'Record', 'GoldRecord', 'PlatinumRecord' then yes
  else no
