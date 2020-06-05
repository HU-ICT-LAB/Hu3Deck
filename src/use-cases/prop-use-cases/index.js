import { propDb} from '../../persistence';
import makeGetSceneProps from './getSceneProps';



const getSceneProps = makeGetSceneProps({ propDb });


const prop = Object.freeze({
    getSceneProps
});


export default prop;

export { getSceneProps };