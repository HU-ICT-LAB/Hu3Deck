import makePostScene from './post-scene';
import makeListAllScenes from './list-all-scenes';

import { getAllScenes, createScene } from './../../use-cases/scene-use-cases/';

const listAllScenes = makeListAllScenes({ getAllScenes });
const postScene = makePostScene({ createScene })

const sceneController = Object.freeze({
    postScene,
    listAllScenes
});
export default sceneController;
export { postScene, listAllScenes };