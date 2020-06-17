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

        if(propObject.background_image_path && propObject.background_image_path !== null) {
            propObject.background_image_path = `/assets/background-images/${propObject.background_image_path}`;
        }

        if(propObject.model_path && propObject.model_path !== null) {
            propObject.model_path = `/assets/model/${propObject.model_path}`;
        }

        if(propObject.audio_path && propObject.audio_path !== null) {
            propObject.audio_path = `/assets/audio/${propObject.audio_path}`;
        }


        // propObject = makeProp(propObject);

        return propObject;
    }
}