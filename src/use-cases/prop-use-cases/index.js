import { propDb} from '../../persistence';

import makeGetSceneProps from './getSceneProps';
import makeGetPropById from './getPropById';
import makeCreateOfTypePropBackground from './createPropOfTypeBackground';
import makeCreateOfTypePropModel from './createPropOfTypeModel';


const getSceneProps = makeGetSceneProps({ propDb });
const getPropById = makeGetPropById({ propDb });
const createPropOfTypeBackground = makeCreateOfTypePropBackground({ propDb });
const createPropOfTypeModel = makeCreateOfTypePropModel({ propDb });

const prop = Object.freeze({
    getSceneProps,
    getPropById,
    createPropOfTypeBackground,
    createPropOfTypeModel
});


export default prop;

export { getSceneProps, getPropById, createPropOfTypeBackground, createPropOfTypeModel };