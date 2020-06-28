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


        const updatedSession = sessionDb.update({
            scene_id: changes.scene_id,
            id
        });

        return updatedSession;
    }
}