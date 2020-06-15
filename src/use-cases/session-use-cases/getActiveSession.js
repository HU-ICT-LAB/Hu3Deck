// import { makeSession } from './../../entities/';
export default function makeGetActiveSession({ sessionDb, sceneDb, propDb }) {
    return async function getActiveSession() {
        let sessionObject = await sessionDb.findActive();
        let scene = await sceneDb.findById({ id : sessionObject.scene_id });
        let props = await propDb.findBySceneId({ id: scene.id });

        scene = {...scene, props};
        sessionObject = {...sessionObject, scene};

        return {
            ...sessionObject
            // ...makeSession(sessionObject).toObject()
        };
    }
}