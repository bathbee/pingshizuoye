//地球
import * as THREE from 'three';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';
import { GUI } from 'dat.gui';

import { createEarth } from './earth.js'; // 引入创建地球的函数

let camera, scene, renderer, gui;

function init() {
    scene = new THREE.Scene();

    const earth = createEarth(); // 创建地球
    scene.add(earth);

    // 创建相机 使用的是 PerspectiveCamera（透视摄像机）
    camera = new THREE.PerspectiveCamera(
        75, // 视野角度（FOV）
        window.innerWidth / window.innerHeight, // 长宽比（aspect ratio）
        0.1, // 近截面（near）
        1000 // 远截面（far）
    );

    // 设置相机摆放的位置
    camera.position.set(5, 5, 5);

    // 设置相机看向的位置
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff); // 背景色变成白色
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
    initHelper();
    initGUI(ambientLight);
    animate(); // 确保在初始化后启动动画
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function initHelper() {
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    const stats = new Stats();
    document.body.appendChild(stats.domElement);
}

function initGUI(ambientLight) {
    gui = new GUI();
    const obj = {
        x: 30
    }

    gui.add(obj, 'x', 0, 100);

    gui.add(ambientLight, 'intensity', 0.1, 2).name('环境光强度').step(0.1).onChange((value) => {
        console.log(value);
    });

    gui.addColor(ambientLight, 'color').name('颜色');

    gui.add(camera.position, 'x', -10, 10).name('相机 X 位置');
    gui.add(camera.position, 'y', -10, 10).name('相机 Y 位置');
    gui.add(camera.position, 'z', -10, 10).name('相机 Z 位置');

    const settings = {
        clear() {
            gui.children[1].reset();
        },
    };
    gui.add(settings, 'clear');

    gui.close();
    gui.open();
}

init();
