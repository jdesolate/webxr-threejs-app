import * as THREE from "three";

// Set up the camera and scene
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const scene = new THREE.Scene();

// Create a plane for the video feed
const planeGeometry = new THREE.PlaneGeometry(16, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, -10);
scene.add(plane);

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const aspect = window.innerWidth / window.innerHeight;
camera.aspect = aspect;
camera.updateProjectionMatrix();

document.body.appendChild(renderer.domElement);

const video = document.createElement("video");
video.autoplay = true;
const texture = new THREE.VideoTexture(video);
planeMaterial.map = texture;
const material = new THREE.MeshBasicMaterial({ map: texture });
const geometry = new THREE.PlaneGeometry(16, 10);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
  video.srcObject = stream; // replace with socket video stream
});

// Create a 3D object to display on top of the video feed
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 0, -5);
scene.add(cube);

// Render the scene
function render() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);

  texture.needsUpdate = true;
}

render();
