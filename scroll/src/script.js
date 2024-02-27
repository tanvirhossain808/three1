import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from "gsap"

/**
 * Debug
 */

const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor').onChange(() => {
        material.color.set(parameters.materialColor)
        particlesMateris.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test cube
 */
const objectDistance = 4
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg")
gradientTexture.magFilter = THREE.NearestFilter
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, .4, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(.8, .35, 100, 16),
    material
)
scene.add(mesh1, mesh2, mesh3)

mesh1.position.y = -objectDistance * 0
mesh2.position.y = -objectDistance * 1
mesh3.position.y = -objectDistance * 2
// mesh3.position.y = -objectDistance * 2
const sectionMeshes = [mesh1, mesh2, mesh3]

//paricles
//geomtery
const particarCount = 200
const postionArray = new Float32Array(particarCount * 3)
for (let i = 0; i < particarCount; i++) {
    postionArray[i * 3 + 0] = (Math.random() - .5) * 10
    postionArray[i * 3 + 1] = objectDistance * .5 - Math.random() * objectDistance * 3
    postionArray[i * 3 + 2] = (Math.random() - .5) * 10
}
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute("position", new THREE.BufferAttribute(postionArray, 3))
const particlesMateris = new THREE.PointsMaterial({
    color: parameters.materialColor,
    size: .03,
    sizeAttenuation: true
})
const particles = new THREE.Points(particleGeometry, particlesMateris)
scene.add(particles)
mesh1.position.x = 2
mesh2.position.x = - 2
mesh3.position.x = 2
//light

const directionalLight = new THREE.DirectionalLight("#ffffff", 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //group


    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
*/
//scrollY
let scrollY = window.scrollY
let currentSection = 0
window.addEventListener("scroll", () => {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)
    if (newSection != currentSection) {

        currentSection = newSection

        gsap.to(
            sectionMeshes[currentSection].rotation, {
            duration: 1.5,
            ease: "power2.inOUt",
            x: "+=6",
            y: "+=3",
            z: "+=1.5"

        }
        )
    }
})

//Cursor
const cursor = {};
cursor.x = 0
cursor.y = 0
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - .5
    cursor.y = e.clientY / sizes.height - .5
})

const clock = new THREE.Clock()
let previouseTime = 0
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previouseTime
    previouseTime = elapsedTime
    //animate camera
    camera.position.y = -scrollY / sizes.height * objectDistance
    const parallaxX = cursor.x
    const parallaxY = -cursor.y
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    // console.log(parallaxY - cameraGroup.position.y, 'heyu');
    //animate meshes
    for (const mesh of sectionMeshes) {
        mesh.rotation.x += deltaTime * .1
        mesh.rotation.y += deltaTime * .12
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()