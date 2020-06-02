import { makeSession, makeUser } from './../../entities/';
export default function makeCreateSession({ sessionDb, userDb }) {
    return async function(requestData) {        
        console.log("createSession: ", requestData);

        const session = makeSession({...requestData});
        const exists = sessionDb.findById({
            id: session.getId()
        });
        


        //Comment back in when database has been implemented.
        // if(Object.keys(exists).length > 0) {
        //     return exists;
        // }

        
        echo(__filename + thisLine(), session);

        //if user doesnt exist, make a new user in the database using the data given.
        //if user already exists, use the id to create a session.

        //check if the scene exists.




        //create function still needs to be implemented.
        return sessionDb.create({
            name: session.getName(),
            user_id: session.getUserId(),
            scene_id: session.getSceneId(),
            date_started: session.getDateStarted()
        });
    }
}