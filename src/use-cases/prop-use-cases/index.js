import { propDb} from '../../persistence';

import makeGetSceneProps from './getSceneProps';
import makeGetPropById from './getPropById';
import makeCreateOfTypePropBackground from './createPropOfTypeBackground';


const getSceneProps = makeGetSceneProps({ propDb });
const getPropById = makeGetPropById({ propDb });
const createPropOfTypeBackground = makeCreateOfTypePropBackground({ propDb });

const prop = Object.freeze({
    getSceneProps,
    getPropById
    createPropOfTypeBackground
});


export default prop;

export { getSceneProps, getPropById, createPropOfTypeBackground };