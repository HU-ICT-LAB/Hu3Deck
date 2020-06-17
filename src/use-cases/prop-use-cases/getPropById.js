import { makeProp } from '../../entities';
export default function createGetPropById({ propDb }) {
    return async function getPropById({
        id
    }) {

        //Could use more validation.
        if(!id) {
            throw new Error("To get the prop, you need a id.");
        }

        let propObject = await propDb.findById({
            id
        });


        if (Object.keys(propObject).length < 1) {
            return {};
        } 

        // propObject = makeProp(propObject);

        return propObject;
    }
}