import { PerspectiveCamera } from 'three';

function createCamera() {
    const camera = new PerspectiveCamera(35, 1, 0.1, 1000); // 调整far值到1000

    camera.position.set(-10, 10, 20); // 调整相机位置更远一些

    return camera;
}
export { createCamera };