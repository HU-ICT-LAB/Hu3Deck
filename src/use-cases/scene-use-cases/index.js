import { sceneDb } from '../../persistence';
import createGetAllScenes from './getAllScenes';


const getAllScenes = createGetAllScenes({ sceneDb });

const session = Object.freeze({
    getAllScenes,
});


export default session;

export { getAllScenes };