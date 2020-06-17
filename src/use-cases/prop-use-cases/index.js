import { propDb} from '../../persistence';

import makeGetSceneProps from './getSceneProps';
import makeGetPropById from './getPropById';


const getSceneProps = makeGetSceneProps({ propDb });
const getPropById = makeGetPropById({ propDb });

const prop = Object.freeze({
    getSceneProps,
    getPropById
});


export default prop;

export { getSceneProps, getPropById };