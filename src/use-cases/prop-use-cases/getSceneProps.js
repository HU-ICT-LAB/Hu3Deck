import { makeProp } from '../../entities';
export default function createGetSceneProps({ propDb }) {
    return async function getSceneProps({
        id
    }) {

        //Could use more validation.
        if(!id) {
            throw new Error("To get the props, you need a sceneId.");
        }

        const propObject = await propDb.findBySceneId({
            id
        });

        if (Object.keys(propObject).length < 1) {
            return {};
        } 

        // if(propObject.background_image_path !== null) {
        //     propObject.background_image_path = `/assets/background-images/${propObject.background_image_path}`;
        // }

        // if(propObject.model_path !== null) {
        //     propObject.model_path = `/assets/audio/${propObject.model_path}`;
        // }

        // if(propObject.audio_path !== null) {
        //     propObject.audio_path = `/assets/model/${propObject.audio_path}`;
        // }


        return propObject;
        
    }
}