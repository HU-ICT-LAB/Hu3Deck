import makeListSceneProps from './list-scene-prop';
import makePostPropBackground from './post-prop-background';
import { getSceneProps, createPropOfTypeBackground } from '../../use-cases/prop-use-cases';


const listSceneProps = makeListSceneProps({ getSceneProps });
const postPropBackground = makePostPropBackground({ createPropOfTypeBackground });

const propController = Object.freeze({
    listSceneProps,
    postPropBackground
});

export default propController;
export { listSceneProps, postPropBackground };