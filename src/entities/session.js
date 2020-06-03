export default function buildMakeSession({uid, sanitize}) {
    return function makeSession({
        id = uid(),
        name,
        date_started = new Date(),
        date_ended,
        date_updated,
        user_id,
        scene_id

    } = {}) {
        
        if(!user_id || user_id.length < 1) {
            throw new Error("Session has to have a user.");
        }
        user_id = sanitize(user_id)
        

        if(!scene_id || scene_id.length < 1) {
            throw new Error("Session has to have a scene.");
        }
        scene_id = sanitize(scene_id);
        
        
        name = sanitize(name);
        if(name.length < 1) {
            throw new Error("Session name must contain usable text.");
        }

        id = sanitize(id);
        if(id.length < 1) {
            throw new Error("Id must be valid.");
        }




        return Object.freeze({
            getName: () => name,
            getDateStarted: () => date_started,
            getDateUpdated: () => date_updated,
            getDateEnded: () => date_ended,
            getId: () => id,
            getUserId: () => user_id,
            getSceneId: () => scene_id,
            toObject: () => {
                return {
                    id,
                    name,
                    date_started,
                    date_updated,
                    date_ended,
                    user_id,
                    scene_id
                }
            }
        });
    }
}