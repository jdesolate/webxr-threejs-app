import * as dat from "dat.gui";
// Adding folders to distinguish between variables

// controls
const gui = new dat.GUI();
// sizes
let width = window.innerWidth;
let height = window.innerHeight;
// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x262626);
// camera
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
camera.position.set(0, 0, 10);
const camFolder = gui.addFolder("Camera");
camFolder.add(camera.position, "z").min(10).max(60).step(10);
// cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const cubeColor = {
  color: 0xffffff,
};
const materialFolder = gui.addFolder("Material");
materialFolder.add(material, "wireframe");
materialFolder.addColor(cubeColor, "color").onChange(() => {
  // callback
  material.color.set(cubeColor.color);
});
materialFolder.open();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
const cubeFolder = gui.addFolder("Cube");
// for position
const posFolder = cubeFolder.addFolder("position");
posFolder.add(cube.position, "x", 0, 5, 0.1);
posFolder.add(cube.position, "y", 0, 5, 0.1);
posFolder.add(cube.position, "z", 0, 5, 0.1);
posFolder.open();
// for scale
const scaleFolder = cubeFolder.addFolder("Scale");
scaleFolder.add(cube.scale, "x", 0, 5, 0.1).name("Width");
scaleFolder.add(cube.scale, "y", 0, 5, 0.1).name("Height");
scaleFolder.add(cube.scale, "z", 0, 5, 0.1).name("Depth");
scaleFolder.open();
cubeFolder.open();
// responsiveness
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});
// renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// animation
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
// rendering the scene
const container = document.querySelector("#threejs-container");
container.append(renderer.domElement);
renderer.render(scene, camera);
animate();
