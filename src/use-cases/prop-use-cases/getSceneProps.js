import { makeProp } from '../../entities';
export default function createGetSceneProps({ propDb }) {
    return async function getSceneProps({
        id
    }) {

        //Check if sceneid exist
        if(!id) {
            throw new Error("To get the props, you need a sceneId.");
        }

        const propObject = await propDb.findBySceneId({
            id
        });

        if (Object.keys(propObject).length < 1) {
            return {};
        } 


        return propObject;
        
    }
}