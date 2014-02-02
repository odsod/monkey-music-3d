THREE = require('three')

class Floor

  @forLevel: (level) ->
    height = level.layout.length
    width = level.layout[0].length
    floorGeometry = new THREE.PlaneGeometry(width, height)
    floorMaterial = new THREE.MeshBasicMaterial({ color: 0x987654 })
    floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = - Math.PI / 2
    floor.position.x = width / 2 - 0.5
    floor.position.z = height / 2 - 0.5
    floor

module.exports = Floor
