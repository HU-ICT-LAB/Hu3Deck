import makePostScene from './post-scene';

import {createScene} from '../../use-cases/scene-use-cases';


const postScene = makePostScene({ createScene })

const sceneController = Object.freeze({
    postScene
});

export default sceneController;
export { postScene };