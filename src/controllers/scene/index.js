import makeListAllScenes from './list-all-scenes';

import { getAllScenes } from './../../use-cases/scene-use-cases/';


const listAllScenes = makeListAllScenes({ getAllScenes });

const sessionController = Object.freeze({
    listAllScenes
});

export default sessionController;
export { listAllScenes };