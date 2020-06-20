import { propDb } from '../../persistence';

import makeGetSceneProps from './getSceneProps';
import makeGetPropById from './getPropById';
import makeCreateOfTypePropBackground from './createPropOfTypeBackground';
import makeGetNotActiveProps from './getNotActiveProps';
import makeCreateSceneProps from './createSceneProps';
import makeCreateOfTypePropModel from './createPropOfTypeModel';


const getSceneProps = makeGetSceneProps({ propDb });
const getPropById = makeGetPropById({ propDb });
const createPropOfTypeBackground = makeCreateOfTypePropBackground({ propDb });
const getNotActiveProps = makeGetNotActiveProps({ propDb });
const createSceneProps = makeCreateSceneProps({ propDb });
const createPropOfTypeModel = makeCreateOfTypePropModel({ propDb });

const prop = Object.freeze({
    getSceneProps,
    getPropById,
    createPropOfTypeBackground,
    getNotActiveProps,
    createSceneProps,
    createPropOfTypeBackground,
    createPropOfTypeModel
});


export default prop;

export { getSceneProps, getPropById, createPropOfTypeBackground, getNotActiveProps, createSceneProps, createPropOfTypeModel };