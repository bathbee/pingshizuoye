import { loadBirds } from './components/birds/bird.js';
import { createCamera } from './camera.js';
import { createLights } from './Lights.js';
import { createScene } from './Scene.js';
import { createControls } from './system/controls.js';
import { createRenderer } from './system/renderer.js';
import { Resizer } from './system/Resizer.js';
import { Loop } from './system/Loop.js';
import * as THREE from 'three';

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
    constructor(container) {
        camera = createCamera();
        renderer = createRenderer();
        scene = createScene();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        controls = createControls(camera, renderer.domElement);

        const { ambientLight, mainLight } = createLights();

        loop.updatables.push(controls);
        scene.add(ambientLight, mainLight);

        const resizer = new Resizer(container, camera, renderer);
    }

    async init() {
        const { parrot, flamingo, stork, parrotAnimations, flamingoAnimations, storkAnimations } = await loadBirds();

        // move the target to the center of the front bird
        controls.target.copy(parrot.position);

        scene.add(parrot, flamingo, stork);

        // 创建动画混合器
        this.parrotMixer = new THREE.AnimationMixer(parrot);
        this.flamingoMixer = new THREE.AnimationMixer(flamingo);
        this.storkMixer = new THREE.AnimationMixer(stork);

        parrotAnimations.forEach((clip) => {
            this.parrotMixer.clipAction(clip).play();
        });
        flamingoAnimations.forEach((clip) => {
            this.flamingoMixer.clipAction(clip).play();
        });
        storkAnimations.forEach((clip) => {
            this.storkMixer.clipAction(clip).play();
        });

        // 将混合器添加到循环更新项中
        loop.updatables.push(this.parrotMixer, this.flamingoMixer, this.storkMixer);
    }

    render() {
        renderer.render(scene, camera);
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export { World };
