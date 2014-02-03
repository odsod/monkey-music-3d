THREE = require('three')
Tween = require('tween').Tween
uvMapForCubeTexture = require('../util.coffee').uvMapForCubeTexture
assets = require('../assets.coffee')

textures =
  monkey: new THREE.Texture(assets.images.monkey)

for name, texture of textures
  texture.magFilter = THREE.NearestFilter
  texture.needsUpdate = true

materials =
  monkey: new THREE.MeshBasicMaterial(map: textures.monkey)
  ear: new THREE.MeshBasicMaterial(color: 0xd1be7c)

metrics =
  head: { width: 7, height: 9, depth: 8 }
  ear: { width: 1, height: 5, depth: 5 }
  body: { width: 4, height: 12, depth: 6 }
  arm: { width: 3, height: 10, depth: 3 }
  leg: { width: 4, height: 6, depth: 3 }
  tail: {}

metrics.leg.translateCenterY = -metrics.leg.height
metrics.leg.offsetY = -metrics.leg.translateCenterY
metrics.leg.offsetZ = metrics.body.depth / 2 - metrics.leg.depth / 2

metrics.body.offsetY = metrics.leg.height

metrics.arm.translateCenterY = -(metrics.arm.height - 1.5)
metrics.arm.offsetY = metrics.body.offsetY +
                      metrics.body.height -
                      metrics.arm.height -
                      metrics.arm.translateCenterY
metrics.arm.offsetZ = metrics.body.depth / 2 + metrics.arm.depth / 2

metrics.head.offsetY = metrics.body.offsetY + metrics.body.height

metrics.ear.offsetY = metrics.head.offsetY +
                      metrics.head.height / 2 -
                      metrics.ear.height / 2
metrics.ear.offsetZ = 4

metrics.tail.offsetX = -3
metrics.tail.offsetY = metrics.leg.height + metrics.body.height / 2 - 3

metrics.height = metrics.head.height + metrics.body.height + metrics.leg.height
metrics.width = 2 * metrics.arm.width + metrics.body.width

geometries = {}
for name, metric of metrics
  # Create body part
  geometries[name] = new THREE.CubeGeometry(
    metric.width, metric.height, metric.depth)
  # Center body part
  geometries[name].applyMatrix(new THREE.Matrix4().makeTranslation(
    0, metric.height / 2, 0))

geometries.leg.applyMatrix(new THREE.Matrix4().makeTranslation(
  0, metrics.leg.translateCenterY, 0))
geometries.arm.applyMatrix(new THREE.Matrix4().makeTranslation(
  0, metrics.arm.translateCenterY, 0))

#   _2
# 3| |
#    |1
#    |__
#      0
geometries.tail = [{
  geometry: new THREE.CubeGeometry(4, 1, 1)
  position: new THREE.Vector3(0, 0, 0)
}, {
  geometry: new THREE.CubeGeometry(1, 10, 1)
  position: new THREE.Vector3(-1.5, 5, 0)
}, {
  geometry: new THREE.CubeGeometry(2, 1, 1)
  position: new THREE.Vector3(-2, 10, 0)
}, {
  geometry: new THREE.CubeGeometry(1, 2, 1)
  position: new THREE.Vector3(-3.5, 9.5, 0)
}].reduce (tailGeometry, part) ->
  part.geometry.applyMatrix(new THREE.Matrix4().setPosition(part.position))
  THREE.GeometryUtils.merge(tailGeometry, part.geometry)
  tailGeometry
, new THREE.Geometry()

geometries.leg.faceVertexUvs[0] = uvMapForCubeTexture
  right:  { x: 0, y: 0, width: 4, height: 12 }
  front:  { x: 4, y: 0, width: 4, height: 12 }
  left:   { x: 8, y: 0, width: 4, height: 12 }
  back:   { x: 12, y: 0, width: 4, height: 12 }
  top:    { x: 4, y: 12, width: 4, height: 4 }
  bottom: { x: 8, y: 12, width: 4, height: 4 }
  textureWidth: 64
  textureHeight: 32

geometries.body.faceVertexUvs[0] = uvMapForCubeTexture
  right:  { x: 16, y: 0, width: 4, height: 12 }
  front:  { x: 20, y: 0, width: 8, height: 12 }
  left:   { x: 28, y: 0, width: 4, height: 12 }
  back:   { x: 32, y: 0, width: 8, height: 12 }
  top:    { x: 20, y: 12, width: 8, height: 4 }
  bottom: { x: 28, y: 12, width: 8, height: 4 }
  textureWidth: 64
  textureHeight: 32

geometries.arm.faceVertexUvs[0] = uvMapForCubeTexture
  right:  { x: 40, y: 0, width: 4, height: 12 }
  front:  { x: 44, y: 0, width: 4, height: 12 }
  left:   { x: 48, y: 0, width: 4, height: 12 }
  back:   { x: 52, y: 0, width: 4, height: 12 }
  top:    { x: 44, y: 12, width: 4, height: 4 }
  bottom: { x: 48, y: 12, width: 4, height: 4 }
  textureWidth: 64
  textureHeight: 32

geometries.head.faceVertexUvs[0] = uvMapForCubeTexture
  top:    { x: 8, y: 24, width: 8, height: 8 }
  front:  { x: 8, y: 16, width: 8, height: 8 }
  right:  { x: 0, y: 16, width: 8, height: 8 }
  left:   { x: 16, y: 16, width: 8, height: 8 }
  bottom: { x: 16, y: 24, width: 8, height: 8 }
  back:   { x: 24, y: 16, width: 8, height: 8 }
  textureWidth: 64
  textureHeight: 32

class Monkey extends THREE.Object3D
  constructor: (options) ->
    super()
    {@stepTime} = options

    @parts =
      head:     new THREE.Mesh(geometries.head, materials.monkey)
      leftArm:  new THREE.Mesh(geometries.arm, materials.monkey)
      rightArm: new THREE.Mesh(geometries.arm, materials.monkey)
      body:     new THREE.Mesh(geometries.body, materials.monkey)
      leftLeg:  new THREE.Mesh(geometries.leg, materials.monkey)
      rightLeg: new THREE.Mesh(geometries.leg, materials.monkey)
      leftEar:  new THREE.Mesh(geometries.ear, materials.ear)
      rightEar: new THREE.Mesh(geometries.ear, materials.ear)
      tail:     new THREE.Mesh(geometries.tail, materials.ear)

    @[name] = part for name, part of @parts

    @head.position.set(0, metrics.head.offsetY, 0)
    @leftEar.position.set(0, metrics.ear.offsetY, -metrics.ear.offsetZ)
    @rightEar.position.set(0, metrics.ear.offsetY, metrics.ear.offsetZ)
    @body.position.set(0, metrics.body.offsetY, 0)
    @leftArm.position.set(0, metrics.arm.offsetY, -metrics.arm.offsetZ)
    @rightArm.position.set(0, metrics.arm.offsetY, metrics.arm.offsetZ)
    @leftLeg.position.set(0, metrics.leg.offsetY, -metrics.leg.offsetZ)
    @rightLeg.position.set(0, metrics.leg.offsetY, metrics.leg.offsetZ)
    @tail.position.set(metrics.tail.offsetX, metrics.tail.offsetY, 0)

    @add(@head)
    @add(@leftEar)
    @add(@rightEar)
    @add(@body)
    @add(@leftArm)
    @add(@rightArm)
    @add(@tail)
    @add(@rightLeg)
    @add(@leftLeg)

    @scale.setLength(1 / metrics.width * 1.10)

  animate: (time, delta) ->
    speed = 0.75 / @stepTime
    unless @rightArm.tween?
      @rightArm.rotation.z = Math.PI / 2
      @rightArm.rotation.z = Math.cos(speed * 0.6662 * time * 20 + Math.PI)
      @rightArm.rotation.x = 0.5 * (Math.cos(speed * 0.2812 * time * 20) - 1)
    unless @leftArm.tween?
      @leftArm.rotation.z = Math.PI / 2
      @leftArm.rotation.z = Math.cos(speed * 0.6662 * time * 20)
      @leftArm.rotation.x = 0.5 * (Math.cos(speed * 0.2312 * time * 20) + 1)
    @rightLeg.rotation.z = Math.cos(speed * 0.6662 * time * 20)
    @leftLeg.rotation.z = Math.cos(speed * 0.6662 * time * 20 + Math.PI)

  performAnimation: (animation) => switch animation.type
    when 'turn' then @turnTo(animation.direction)
    when 'pickup' then @pickup()
    when 'move' then @move(animation.to)

  resetAnimations: =>
    for name, part of @parts
      if part.tween?
        part.tween.stop()
        delete part.tween

  pickup: () =>
    animationTime = @stepTime * 1000 / 4
    for arm in [@rightArm, @leftArm]
      arm.tween.stop() if arm.tween?
      arm.tween = new Tween(arm.rotation)
        .to(z: Math.PI / 4, x: 0, animationTime)
        .start()

  setStepTime: (@stepTime) ->

  move: (to) =>
    {x, y} = to
    new Tween(@position).to({x: x, z: y}, @stepTime * 1000).start()

  turnTo: (direction) =>
    rotation = switch direction
      when 'N' then 1 / 2 * Math.PI
      when 'S' then 3 / 2 * Math.PI
      when 'W' then Math.PI
      when 'E' then 0
    animationTime = @stepTime * 1000 / 2
    new Tween(@rotation).to(y: rotation, animationTime).start()

exports.Monkey = Monkey
