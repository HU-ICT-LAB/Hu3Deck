import { sessionDb, userDb, sceneDb } from '../../persistence';
import makeCreateScene from './createScene';


const createScene = makeCreateScene({ sceneDb });

const scene = Object.freeze({
    createScene
});


export default scene;

export {createScene};