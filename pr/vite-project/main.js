import './style.css'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
const canvas = document.querySelector(".webgl");

const scence = new THREE.Scene()


const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
)
scence.add(mesh)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
scence.add(camera)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.setClearColor = "red"
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const clock = new THREE.Clock()
let count = .01
const tick = () => {
  const elpaseTime = clock.getElapsedTime()
  // console.log(elpaseTime);
  const valueX = Math.random();
  mesh.position.x = Math.sin(elpaseTime)
  // mesh.position.z = Math.cos(elpaseTime)


  controls.update()
  renderer.render(scence, camera)
  window.requestAnimationFrame(tick)
  count += .01

}

tick()