import *as THREE from 'three';

const geometry = new THREE.SphereGeometry(
    10,          // 半径
    32,          // 水平分段数，增加细节
    24,          // 垂直分段数，增加细节
    0,           // 起始纬度，从赤道开始
    Math.PI * 2,     // 纬度角度长度，表示完整的180度即Math.PI
    0,           // 起始经度，从正方向开始
    Math.PI * 2  // 经度角度长度，表示完整的360度即Math.PI*2
);
//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象
const texture = texLoader.load('src/earth.jpg');
const material = new THREE.MeshLambertMaterial({
// 设置纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//map表示材质的颜色贴图属性
});
const mesh=new THREE.Mesh(geometry,material)

export default mesh;