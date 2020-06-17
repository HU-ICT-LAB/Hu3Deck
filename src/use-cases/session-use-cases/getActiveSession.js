// import { makeSession } from './../../entities/';
export default function makeGetActiveSession({ sessionDb, sceneDb, propDb }) {
    return async function getActiveSession() {
        let sessionObject = await sessionDb.findActive();
        let scene = await sceneDb.findById({ id : sessionObject.scene_id });
        let props = await propDb.findBySceneId({ id: scene.id });

        props.forEach((val) => {
            if(val.background_image_path !== null) {
                val.background_image_path = `/assets/background-images/${val.background_image_path}`;
            }

            if(val.model_path !== null) {
                val.model_path = `/assets/model/${val.model_path}`;
            }

            if(val.audio_path !== null) {
                val.audio_path = `/assets/audio/${val.audio_path}`;
            }
        });

        scene = {...scene, props};



        sessionObject = {...sessionObject, scene};


        

        return {
            ...sessionObject
            // ...makeSession(sessionObject).toObject()
        };
    }
}