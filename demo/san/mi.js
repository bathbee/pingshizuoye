import * as THREE from 'three';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';
import { GUI } from 'dat.gui'; // 注意修改导入路径

import { init, animate, onWindowResize, initHelper, initGUI, addParticleSystem } from './setup.js'; // 导入辅助函数

init();
animate();
