import { makeSession } from '../../entities';
export default function createUpdateSession({sessionDb}) {
    return function updateSession({
        id,
        ...changes
    }) {
        

        const existingSession = sessionDb.findById(id);

        if(!existingSession) {
            throw new Error("Session doesnt exist");
        }


        const session = makeSession({...existingSession, ...changes});


        const updatedSession = sessionDb.update({
            sceneId: session.getSceneId()
        });
    }
}