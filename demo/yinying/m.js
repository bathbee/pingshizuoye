//圆柱阴影
import * as THREE from 'three';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import Stats from '../../node_modules/three/examples/jsm/libs/stats.module.js';
import cylinder from './cylinder.js';
import ground from './ground.js';
import { GUI } from 'dat.gui';

const clock = new THREE.Clock();

let camera, scene, renderer, stats, gui = {};

function init() {
    // 场景
    scene = new THREE.Scene();

    // 添加物体
    scene.add(cylinder);
    scene.add(ground);

    // 相机
    camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        300
    );
    camera.position.set(100, 100, 100);
    camera.lookAt(0, 0, 0);

    // 光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); //环境光
    scene.add(ambientLight);

    // 点光源
    const spotLight = new THREE.SpotLight(0xffffff, 2); //聚光灯
    spotLight.decay = 0.3;
    spotLight.angle = Math.PI / 5; // 聚光灯的光束角度
    spotLight.position.set(15, 20, 0); // 位置
    spotLight.penumbra = 0.3; // 半影
    spotLight.castShadow = true; // 光源的阴影投射
    const spotLightHelper = new THREE.SpotLightHelper(spotLight); // 辅助对象，用于可视化光束的位置和方向
    scene.add(spotLightHelper);
    scene.add(spotLight);

    // 渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // 阴影渲染
    renderer.setClearColor(0xffffff, 1); // 背景颜色设置为白色
    document.body.appendChild(renderer.domElement);

    // 窗口调整
    window.onresize = onWindowResize;

    initHelper();
    initGUI(ambientLight);
}

function animate() {

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    stats.update();
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function initHelper() {
    // 辅助线
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', () => {
        renderer.render(scene, camera);
    });

    stats = new Stats();
    document.body.appendChild(stats.domElement);
}

function initGUI(ambientLight) {
    gui = new GUI();
    const settings = {
        intensity: 1
    };
    gui.add(settings, 'intensity', 0, 2).onChange(value => {
        ambientLight.intensity = value;
    });
}

init();
animate();
