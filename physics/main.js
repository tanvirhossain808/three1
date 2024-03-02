import './style.css'

import * as THREE from "three"
import CANNON, { Vec3 } from 'cannon';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from "lil-gui"




const scence = new THREE.Scene()
//sounds
const hitSounds = new Audio("/sounds/hit.mp3")
const playHitSound = (collision) => {
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()
    if (impactStrength > 1.5) {
        hitSounds.volume = Math.random()
        hitSounds.currentTime = 0
        hitSounds.play()
    }

}

const gui = new dat.GUI()
const debugObject = {}

debugObject.createSphere = () => {
    createSphere(Math.random() * .5, {
        x: (Math.random() - .5) * 3,
        y: 3,
        z: (Math.random() - .5) * 3,
    })
}

debugObject.createBox = () => {
    createBox(Math.random(),
        Math.random(),
        Math.random(), {
        x: (Math.random() - .5) * 3,
        y: 3,
        z: (Math.random() - .5) * 3,
    })
}

debugObject.reset = () => {
    for (const object of objectToUpdate) {
        object.body.removeEventListener("collide", playHitSound)
        world.removeBody(object.body)
        scence.remove(object.mesh)
    }
    objectToUpdate.splice(0, objectToUpdate.length)
    console.log(objectToUpdate.length);
}

gui.add(debugObject, "createBox")
gui.add(debugObject, "createSphere")
gui.add(debugObject, "reset")
const canvas = document.querySelector("#webgl")


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

const textureLoader = new THREE.TextureLoader()
// const environmentTexture= textureLoader.load("textures/")

const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0, -9.82, 0)
const defualMaterial = new CANNON.Material("default")
const defaultContactMaterial = new CANNON.ContactMaterial(
    defualMaterial,
    defualMaterial,
    {
        friction: .1,
        restitution: .7
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial
const sphereShape = new CANNON.Sphere(.5)
const sphereBody = new CANNON.Body(
    {
        mass: 0,
        position: new CANNON.Vec3(0, 3, 0),
        shape: sphereShape,
        // material: defualMaterial
    }
)
sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0))
// world.addBody(sphereBody)

//floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body(
)
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI * .5
)
// floorBody.material = defualMaterial
world.addBody(floorBody)

// floorBody.position = new CANNON.Vec3(0, 3, 0)
const ambeientLight = new THREE.AmbientLight("white", 1)
scence.add(ambeientLight)
const planeGeometry = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial(
        {
            roughness: 5,
            metalness: .3
        }
    )
)
planeGeometry.rotation.x = -Math.PI * .5

// const sphereGeometry = new THREE.Mesh(
//     new THREE.SphereGeometry(.5, 20, 20),
//     new THREE.MeshStandardMaterial(
//         {
//             color: 'red',
//             metalness: 0
//         }
//     )
// )
// sphereGeometry.position.z = -1
// sphereGeometry.position.x = 1
// sphereGeometry.position.y = 1
scence.add(planeGeometry)





const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .01, 1000)
// camera.position.set(-3, 3, 3)
// camera.position.z = -5
camera.position.y = 5
// camera.position.x = -5
camera.position.z = 3
// camera.position.z = 1
// camera.lookAt(planeGeometry.position)
scence.add(camera)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



const renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas
    }
)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//Utils

const objectToUpdate = []
//sphere
const sphreGeometry = new THREE.SphereGeometry(1, 20, 20)
const shphereMaterial = new THREE.MeshStandardMaterial(
    {
        metalness: .3,
        roughness: .4,
        color: "red"
    }
)
const createSphere = (radius, position) => {

    const mesh = new THREE.Mesh(
        sphreGeometry,
        shphereMaterial
    )
    mesh.castShadow = true
    mesh.scale.set(radius, radius, radius)
    mesh.position.copy(position)
    scence.add(mesh)


    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape: shape,
        material: defualMaterial
    })
    body.position.copy(position)
    body.addEventListener("collide", playHitSound)
    world.addBody(body)
    objectToUpdate.push(
        {
            mesh: mesh,
            body: body
        }
    )
}

createSphere(.5, { x: 0, y: 3, z: 0 })

//box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial(
    {
        metalness: .3,
        roughness: .4,
        color: "red"
    }
)


const createBox = (width, height, depth, position) => {

    const mesh = new THREE.Mesh(
        boxGeometry,
        boxMaterial
    )
    mesh.castShadow = true
    mesh.scale.set(width, height, depth)
    mesh.position.copy(position)
    scence.add(mesh)


    const shape = new CANNON.Box(new CANNON.Vec3(width * .5, height * .5, depth * .5))
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape: shape,
        material: defualMaterial
    })
    body.position.copy(position)
    world.addBody(body)
    body.addEventListener("collide", playHitSound)
    objectToUpdate.push(
        {
            mesh: mesh,
            body: body
        }
    )
}

const clock = new THREE.Clock()
let oldElapsedTime = 0
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime
    //update phsyics word
    // sphereBody.applyForce(new CANNON.Vec3(-.5, 0, 0), sphereBody.position)
    world.step(1 / 60, deltaTime, 3)
    for (const object of objectToUpdate) {
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }
    // sphereGeometry.position.copy(sphereBody.position)
    renderer.render(scence, camera)
    controls.update()
    window.requestAnimationFrame(tick)

}

tick()




