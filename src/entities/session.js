export default function buildMakeSession({uid, sanitize}) {
    return function makeSession({
        id = uid(),
        name,
        date_started = Date.now(),
        date_ended,
        userId,
        sceneId

    } = {}) {
        userId = sanitize(userId)
        if(!userId || userId.length < 1) {
            throw new Error("Session has to have a user.");
        }

        sceneId = sanitize(sceneId);
        if(!sceneId || userId.length < 1) {
            throw new Error("Session has to have a scene.");
        }
        
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
            getDateEnded: () => date_ended,
            getId: () => id,
            getUserId: () => userId,
            getSceneId: () => sceneId,
            toObject: () => {
                return {
                    id,
                    name,
                    date_started,
                    date_ended,
                    userId,
                    sceneId
                }
            }
        });
    }
}