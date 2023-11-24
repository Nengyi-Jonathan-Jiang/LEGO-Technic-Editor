// import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

import {
    AxesHelper, Color, DirectionalLight,
    MeshPhongMaterial, Object3D,
    PerspectiveCamera,
    PointLight,
    Scene, Vector3,
    WebGLRenderer
} from "three";

const scene = new Scene()
scene.background = new Color('#ffffff')
scene.add(new AxesHelper(5))

const light = new DirectionalLight(0xffffff, 4)
light.position.set(2.5, 7.5, 15)
scene.add(light)
const light2 = new DirectionalLight(0xffffff, 4)
light2.position.set(-2.5, -7.5, -15)
scene.add(light2)

const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 3

const renderer = new WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// const material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const mtl_RED = new MeshPhongMaterial({color: "#ff0525", specular: "#ffffff"})
const mtl_BLACK = new MeshPhongMaterial({color: "#050505", specular: "#ffffff"})

const objLoader = new OBJLoader()

/**
 * @param {string} url
 * @param {MeshPhongMaterial} mtl
 * @param {Vector3} pos
 */
function loadObject(url, mtl, pos) {
    objLoader.load(url, (object) => {
            (object.children[0]).material = mtl
            object.translateX(pos.x);
            object.translateY(pos.y);
            object.translateZ(pos.z);
            scene.add(object);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )
}

loadObject('models/LEGO/Beam1x3.obj', mtl_RED, new Vector3(0, 0, 0))
loadObject('models/LEGO/Beam1x5.obj', mtl_BLACK, new Vector3(0, 0, -1))
loadObject('models/LEGO/Beam1x7.obj', mtl_RED, new Vector3(0, 0, -2))
loadObject('models/LEGO/Beam1x9.obj', mtl_BLACK, new Vector3(0, 0, -3))
loadObject('models/LEGO/Beam1x11.obj', mtl_RED, new Vector3(0, 0, -4))
loadObject('models/LEGO/Beam1x13.obj', mtl_BLACK, new Vector3(0, 0, -5))
loadObject('models/LEGO/Beam1x15.obj', mtl_RED, new Vector3(0, 0, -6))


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()