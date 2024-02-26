import * as THREE from 'three';
const canvas = document.querySelector('canvas.webgl')
// // import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene()
// // import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// const scene = new THREE.Scene();
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh)
// // Sizes
// const sizes = {
//     width: 800,
//     height: 600
// }

// // Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// // scene.add(canvas)
// // const controls = new OrbitControls(camera, renderer.domElement);
// // const loader = new GLTFLoader()
// console.log(canvas);
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })

// camera.position.z = 3
// scene.add(camera)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
scene.add(camera)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera)
