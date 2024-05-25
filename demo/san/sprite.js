import *as THREE from 'three';

// 创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
    color: 0x00ffff,//设置颜色
});

// 创建精灵模型对象，不需要几何体geometry参数
const sprite = new THREE.Sprite(spriteMaterial);

// 删除未定义的 mesh 和 camera 代码
// const mesh = new THREE.Mesh(geometry, material);
// const s = 0.5;
// const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);

// 控制精灵大小
console.log('sprite.scale', sprite.scale);
sprite.scale.set(50, 25, 1); //只需要设置x、y两个分量就可以
sprite.position.set(0, 50, 0);

export default sprite;
