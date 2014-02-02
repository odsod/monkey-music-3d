THREE = require('three')
assets = require('../assets.coffee')
VoxelObject = require('../objects/voxel-object.coffee').VoxelObject

exports.voxelObjectFor = (thing) -> new VoxelObject(assets.images[thing])
