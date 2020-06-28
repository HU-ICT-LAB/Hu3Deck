import { sceneDb } from '../../persistence';

import createGetAllScenes from './getAllScenes';
import makeCreateScene from './createScene';

const getAllScenes = createGetAllScenes({ sceneDb });
const createScene = makeCreateScene({ sceneDb });

const scene = Object.freeze({
    createScene,
    getAllScenes
});
export default scene;
export { createScene, getAllScenes };