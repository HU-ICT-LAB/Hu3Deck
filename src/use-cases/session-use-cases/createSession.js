import { makeSession } from './../../entities/';
export default function makeCreateSession({ sessionDb, userDb, sceneDb }) {
    return async function(requestData) {        
        const session = makeSession({...requestData});
        
        //Check if the session already exists.
        const sessionExists = await sessionDb.findById({
            id: session.getId()
        });

        if(Object.keys(sessionExists).length > 0) {
            throw new Error("Session already exists.");
        }


        //check if the user exists.
        const userExists = await userDb.findById({
            id: session.getUserId()
        });
        
        if(Object.keys(userExists).length < 1) {
            throw new Error("User doesnt exist.");
        }


        //check if the scene exists.
        const sceneExists = await sceneDb.findById({
            id: session.getSceneId()
        });

        
        if(Object.keys(sceneExists).length < 1) {
            throw new Error("Scene doesnt exist.");
        }



        //create function still needs to be implemented.
        return sessionDb.create({
            id: session.getId(),
            name: session.getName(),
            user_id: session.getUserId(),
            scene_id: session.getSceneId(),
            date_started: session.getDateStarted()
        });
    }
}