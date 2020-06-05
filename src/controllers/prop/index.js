import makeListSceneProps from './list-scene-prop';

import { getSceneProps } from '../../use-cases/prop-use-cases';


const listSceneProps = makeListSceneProps({ getSceneProps });

const propController = Object.freeze({
    listSceneProps
});

export default propController;
export { listSceneProps };