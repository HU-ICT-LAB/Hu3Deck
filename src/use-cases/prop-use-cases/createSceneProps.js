import { makeProp } from '../../entities';

export default function makeCreateSceneProps({ propDb }) {
    return function(propInfo) {   
        
        const propInstance = makeProp(propInfo);

        return propInstance;
    }
}