import * as THREE from 'three';

function getTexture() {
    return new THREE.TextureLoader().load('./people2.png'); // 确保图片路径正确
}

const vertices = new Float32Array([
    -10, -10, 10,
    10, -10, 10,
    10, 10, 10,
    -10, 10, 10,
]);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({
    color: 0x88ccff,
    map: getTexture(),
    size: 10,
    transparent: true,
    opacity: 0.5
});

const points = new THREE.Points(geometry, material);

export default points;
