import * as THREE from 'three';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui';
import { createCube } from './cube.js';


// Canvas
const canvas = document.querySelector('#mainCanvas');

// Scene
const scene = new THREE.Scene();

// 创建并添加立方体到场景中
const cube = createCube();
scene.add(cube);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(2, 2, 2);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.zoomSpeed = 0.3;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

canvas.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// 自动旋转开关
let autoRotate = false;

// Animations
const tick = () => {
    controls.update();

    if (autoRotate) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }

    // Render
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};

tick();

/**
 * Debug
 */
const gui = new GUI();

const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
cubeFolder.open();

const lightFolder = gui.addFolder('Lights');
lightFolder.add(ambientLight, 'intensity', 0, 1, 0.01).name('Ambient Intensity');
lightFolder.add(directionalLight, 'intensity', 0, 1, 0.01).name('Directional Intensity');
lightFolder.open();

// 添加自动旋转按钮
gui.add({ autoRotate: false }, 'autoRotate').name('Auto Rotate').onChange(value => {
    autoRotate = value;
});
