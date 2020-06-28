import { makeProp } from '../../entities';
export default function createGetNotActiveProps({ propDb }) {
    return async function getNotActiveProps(id) {
 
        const propObject = await propDb.findNotActive(id);

        if (Object.keys(propObject).length < 1) {
            return {};
        } 

        return propObject;
    }
}