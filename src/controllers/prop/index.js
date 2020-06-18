import makeListSceneProps from './list-scene-prop';
import makePostPropBackground from './post-prop-background';
import makeListNotActiveProps from './list-not-active-prop';
import { getSceneProps, createPropOfTypeBackground, getNotActiveProps } from '../../use-cases/prop-use-cases';


const listSceneProps = makeListSceneProps({ getSceneProps });
const postPropBackground = makePostPropBackground({ createPropOfTypeBackground });
const listNotActiveProps = makeListNotActiveProps({ getNotActiveProps });

const propController = Object.freeze({
    listSceneProps,
    postPropBackground,
    listNotActiveProps
});

export default propController;
export { listSceneProps, postPropBackground, listNotActiveProps };