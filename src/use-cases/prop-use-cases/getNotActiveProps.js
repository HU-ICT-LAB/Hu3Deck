import { makeProp } from '../../entities';
export default function createGetNotActiveProps({ propDb }) {
    return async function getNotActiveProps() {
 
        const propObject = await propDb.findNotActive();

        if (Object.keys(propObject).length < 1) {
            return {};
        } 

        return propObject;
        
    }
}