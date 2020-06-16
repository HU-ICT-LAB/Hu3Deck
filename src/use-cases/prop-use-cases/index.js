import { propDb} from '../../persistence';
import makeGetSceneProps from './getSceneProps';
import makeCreateOfTypePropBackground from './createPropOfTypeBackground';



const getSceneProps = makeGetSceneProps({ propDb });
const createPropOfTypeBackground = makeCreateOfTypePropBackground({ propDb });


const prop = Object.freeze({
    getSceneProps,
    createPropOfTypeBackground
});


export default prop;

export { getSceneProps, createPropOfTypeBackground };