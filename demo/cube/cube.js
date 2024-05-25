// cube.js

import * as THREE from 'three';

// 创建一个蓝色立方体并导出
const createCube = () => {
    // 定义立方体的几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // 定义蓝色材质
    const material = new THREE.MeshStandardMaterial({ color: '#0000ff' });

    // 创建立方体网格
    const cube = new THREE.Mesh(geometry, material);

    return cube;
};

export { createCube };
