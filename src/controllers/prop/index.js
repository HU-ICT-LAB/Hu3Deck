import makeListSceneProps from './list-scene-prop';
import makePostPropBackground from './post-prop-background';
import makeListNotActiveProps from './list-not-active-prop';
import makePostSceneProps from './post-scene-prop';
import makePostPropModel from './post-prop-model';

import { getSceneProps, createPropOfTypeBackground, getNotActiveProps, createSceneProps, createPropOfTypeModel } from '../../use-cases/prop-use-cases';


const listSceneProps = makeListSceneProps({ getSceneProps });
const postPropBackground = makePostPropBackground({ createPropOfTypeBackground });
const listNotActiveProps = makeListNotActiveProps({ getNotActiveProps });
const postSceneProps = makePostSceneProps({ createSceneProps });
const postPropModel = makePostPropModel({ createPropOfTypeModel });

const propController = Object.freeze({
    listSceneProps,
    postPropBackground,
    listNotActiveProps,
    postSceneProps,
    postPropModel
});

export default propController;
export { listSceneProps, postPropBackground, listNotActiveProps, postSceneProps, postPropModel };