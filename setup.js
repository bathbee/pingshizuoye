import * as THREE from 'three';

export let camera, scene, renderer, gui, particles;

export function init() {
    // 创建场景
    scene = new THREE.Scene();

    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 1000;

    // 创建渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 添加监听器
    window.addEventListener('resize', onWindowResize);

    // 初始化辅助对象
    initHelper();

    // 初始化GUI
    initGUI();

    // 添加粒子系统
    addParticleSystem();
}

export function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

export function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function initHelper() {
    // 添加轴辅助
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    // 添加网格辅助
    const gridHelper = new THREE.GridHelper(1000, 100, 0x000000, 0x004444);
    scene.add(gridHelper);

    // 添加性能监视器
    const stats = new Stats();
    document.body.appendChild(stats.dom);
}

export function initGUI() {
    gui = new GUI();

    // 控制粒子系统透明度的示例
    const particleSystemFolder = gui.addFolder('Particle System');
    particleSystemFolder.add(particles.material, 'transparent').name('Transparent');
    particleSystemFolder.add(particles.material, 'opacity', 0, 1).name('Opacity');

    particleSystemFolder.open(); // 默认展开粒子系统的控制面板
}

export function addParticleSystem() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    const textureLoader = new THREE.TextureLoader();
    const sprite = textureLoader.load('textures/sprites/snowflake1.png'); // 加载粒子纹理图片

    for (let i = 0; i < 10000; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;

        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        size: 10,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}
