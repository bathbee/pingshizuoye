import * as THREE from 'three';

export function createEarth() {
    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('earth.jpg');

    // Create geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // Create material
    const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        shininess: 100, // 控制光泽度
    });

    // Create mesh
    const earth = new THREE.Mesh(geometry, material);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 50% intensity
    earth.add(ambientLight);

    return earth;
}
