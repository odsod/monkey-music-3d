var THREE = window.THREE;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1500);

var uvMapCubeToTexture = function(args) {
  return [
    args.front,
    args.back,
    args.top,
    args.bottom,
    args.right,
    args.left
  ].map(function(face) {
    // Calculate face vertices
    //   3 --- 2
    //   |     |
    //   0 --- 1
    return [
      new THREE.Vector2(face.x, face.y),
      new THREE.Vector2(face.x + face.width, face.y),
      new THREE.Vector2(face.x + face.width, face.y + face.height),
      new THREE.Vector2(face.x, face.y + face.height)
    ];
  }).map(function(faceVertices) {
    // Convert to UV space
    return faceVertices.map(function(faceVertex) {
      faceVertex.x /= args.textureWidth;
      faceVertex.y /= args.textureHeight;
      return faceVertex;
    });
  }).map(function(faceVertices) {
    // Triangulate quad
    return [
      [faceVertices[3], faceVertices[0], faceVertices[2]],
      [faceVertices[0], faceVertices[1], faceVertices[2]]
    ];
  }).reduce(function(result, arr) {
    // Concatenate to single array of triangles
    return result.concat(arr);
  });
};

var cb = function() {};

var charMaterial = new THREE.MeshBasicMaterial();

var legGeometry = new THREE.CubeGeometry(4, 12, 4);
legGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -6, 0));
var armGeometry = new THREE.CubeGeometry(4, 12, 4);
armGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -4, 0));
var bodyGeometry = new THREE.CubeGeometry(4, 12, 8);
var headGeometry = new THREE.CubeGeometry(8, 8, 8);

var leftLeg = new THREE.Mesh(legGeometry, charMaterial);
var rightLeg = new THREE.Mesh(legGeometry, charMaterial);
var body = new THREE.Mesh(bodyGeometry, charMaterial);
var leftArm = new THREE.Mesh(armGeometry, charMaterial);
var rightArm = new THREE.Mesh(armGeometry, charMaterial);
var head = new THREE.Mesh(headGeometry, charMaterial);

head.position.set(0, 10, 0);
body.position.set(0, 0, 0);
leftArm.position.set(Math.PI / 32, 4, -6);
rightArm.position.set(-Math.PI / 32, 4, 6);
leftLeg.position.set(0, -6, -2);
rightLeg.position.set(0, -6, 2);

var character = new THREE.Object3D();
character.add(head);
character.add(body);
character.add(leftArm);
character.add(rightArm);
character.add(leftLeg);
character.add(rightLeg);

scene.add(character);

legGeometry.faceVertexUvs[0] = uvMapCubeToTexture({
  right:  { x: 0, y: 0, width: 4, height: 12 },
  front:  { x: 4, y: 0, width: 4, height: 12 },
  left:   { x: 8, y: 0, width: 4, height: 12 },
  back:   { x: 12, y: 0, width: 4, height: 12 },
  top:    { x: 4, y: 12, width: 4, height: 4 },
  bottom: { x: 8, y: 12, width: 4, height: 4 },
  textureWidth: 64,
  textureHeight: 32
});

bodyGeometry.faceVertexUvs[0] = uvMapCubeToTexture({
  right:  { x: 16, y: 0, width: 4, height: 12 },
  front:  { x: 20, y: 0, width: 8, height: 12 },
  left:   { x: 28, y: 0, width: 4, height: 12 },
  back:   { x: 32, y: 0, width: 8, height: 12 },
  top:    { x: 20, y: 12, width: 8, height: 4 },
  bottom: { x: 28, y: 12, width: 8, height: 4 },
  textureWidth: 64,
  textureHeight: 32
});

armGeometry.faceVertexUvs[0] = uvMapCubeToTexture({
  right:  { x: 40, y: 0, width: 4, height: 12 },
  front:  { x: 44, y: 0, width: 4, height: 12 },
  left:   { x: 48, y: 0, width: 4, height: 12 },
  back:   { x: 52, y: 0, width: 4, height: 12 },
  top:    { x: 44, y: 12, width: 4, height: 4 },
  bottom: { x: 48, y: 12, width: 4, height: 4 },
  textureWidth: 64,
  textureHeight: 32
});

headGeometry.faceVertexUvs[0] = uvMapCubeToTexture({
  top:    { x: 8, y: 24, width: 8, height: 8 },
  front:  { x: 8, y: 16, width: 8, height: 8 },
  right:  { x: 0, y: 16, width: 8, height: 8 },
  left:   { x: 16, y: 16, width: 8, height: 8 },
  bottom: { x: 16, y: 24, width: 8, height: 8 },
  back:   { x: 24, y: 16, width: 8, height: 8 },
  textureWidth: 64,
  textureHeight: 32
});

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var clock = new THREE.Clock();
clock.start();

var render = function() {
  var time = clock.getElapsedTime();

  camera.position.set(0, 0, 50);

  rightArm.rotation.z = 2 * Math.cos(0.6662 * time * 10 + Math.PI);
  rightArm.rotation.x = 1 * (Math.cos(0.2812 * time * 10) - 1);
  leftArm.rotation.z = 2 * Math.cos(0.6662 * time * 10);
  leftArm.rotation.x = 1 * (Math.cos(0.2312 * time * 10) + 1);

  rightLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10);
  leftLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10 + Math.PI);

  character.rotation.y = time;

  renderer.render(scene, camera);
  window.requestAnimationFrame(render, renderer.domElement);
};

// Load resources
charMaterial.map = THREE.ImageUtils.loadTexture('char.png', {}, render);
charMaterial.map.magFilter = THREE.NearestFilter;
