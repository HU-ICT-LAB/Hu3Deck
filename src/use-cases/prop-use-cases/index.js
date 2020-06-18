import { propDb} from '../../persistence';

import makeGetSceneProps from './getSceneProps';
import makeGetPropById from './getPropById';
import makeCreateOfTypePropBackground from './createPropOfTypeBackground';
import makeGetNotActiveProps from './getNotActiveProps';


const getSceneProps = makeGetSceneProps({ propDb });
const getPropById = makeGetPropById({ propDb });
const createPropOfTypeBackground = makeCreateOfTypePropBackground({ propDb });
const getNotActiveProps = makeGetNotActiveProps({ propDb });

const prop = Object.freeze({
    getSceneProps,
    getPropById,
    createPropOfTypeBackground,
    getNotActiveProps
});


export default prop;

export { getSceneProps, getPropById, createPropOfTypeBackground, getNotActiveProps };