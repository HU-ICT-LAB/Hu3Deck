export default function buildMakePropMovement({uid, sanitize}) {
    return function makePropMovement({
        id = uid(),
        pointFromId = uid(),
        pointToId = uid(),
        pointOuterId = uid(),
        movement,
        easing,
        loop,
        duration,
        dateAdded = new Date(),
        dateUpdated = new Date()

    } = {}) {
        

        id = sanitize(id);
        if(id.length < 1) {
            throw new Error("Id must be valid.");
        }

        return Object.freeze({
            getMovementId: () => id,
            getPointFromId: () => pointFromId,
            getPointToId: () => pointToId,
            getPointOuterId: () => pointOuterId,
            getMovement: () => movement,
            getEasing: () => easing,
            getLoop: () => loop,
            getDuration: () => duration,
            getDateAdded: () => dateAdded,
            getDateUpdated: () => dateUpdated
        });
    }
}