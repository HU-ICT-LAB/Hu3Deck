import makeListSceneProps from './list-scene-prop';
import makePostPropBackground from './post-prop-background';
import makePostPropModel from './post-prop-model';
import { getSceneProps, createPropOfTypeBackground, createPropOfTypeModel } from '../../use-cases/prop-use-cases';


const listSceneProps = makeListSceneProps({ getSceneProps });
const postPropBackground = makePostPropBackground({ createPropOfTypeBackground });
const postPropModel = makePostPropModel({ createPropOfTypeModel });

const propController = Object.freeze({
    listSceneProps,
    postPropBackground,
    postPropModel
});

export default propController;
export { listSceneProps, postPropBackground, postPropModel };