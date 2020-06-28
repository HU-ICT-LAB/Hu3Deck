import { makeProp } from '../../entities';
export default function createGetPropById({ propDb }) {
    return async function getPropById({
        id
    }) {

        //check if propid exist
        if(!id) {
            throw new Error("To get the prop, you need a id.");
        }

        let propObject = await propDb.findById({
            id
        });


        if (Object.keys(propObject).length < 1) {
            return {};
        } 
        // check if background image path is not undefined and !== null
        if(propObject.background_image_path && propObject.background_image_path !== null) {
            propObject.background_image_path = `/assets/background-images/${propObject.background_image_path}`;
        }
        // check if model path is not undefined and !== null
        if(propObject.model_path && propObject.model_path !== null) {
            propObject.model_path = `/assets/model/${propObject.model_path}`;
        }
        // check if audio path is not undefined and !== null
        if(propObject.audio_path && propObject.audio_path !== null) {
            propObject.audio_path = `/assets/audio/${propObject.audio_path}`;
        }

        return propObject;
    }
}