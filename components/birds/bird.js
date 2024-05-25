import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { GLTFLoader } from '../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';


async function loadBirds() {
    const loader = new GLTFLoader();

    const [parrotData, flamingoData, storkData] = await Promise.all([
        loader.loadAsync('../../model/Parrot.glb'),
        loader.loadAsync('../../model/Flamingo.glb'),
        loader.loadAsync('../../model/Stork.glb'),
    ]);

    console.log('Squaaawk!', parrotData);

    const parrot = setupModel(parrotData);
    parrot.position.set(50, 100, 2.5);

    const flamingo = setupModel(flamingoData);
    flamingo.position.set(-100, 75, -20);

    const stork = setupModel(storkData);
    stork.position.set(0, -2.5, -10);

    return {
        parrot,
        flamingo,
        stork,
        parrotAnimations: parrotData.animations,
        flamingoAnimations: flamingoData.animations,
        storkAnimations: storkData.animations,
    };
}

function setupModel(data) {
    const model = data.scene;
    return model;
}

export { loadBirds, setupModel };
