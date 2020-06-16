export default function buildMakeProp({uid, sanitize}) {
    return function makeProp({
        id = uid(),
        propName,
        propType,
        dateAdded = new Date(),
        dateUpdated = new Date(),
        backgroundId,
        modelId,
        apiId,
        soundId,
        movementId

    } = {}) {
        

        id = sanitize(id);
        if(id.length < 1) {
            throw new Error("Id must be valid.");
        }

        return Object.freeze({
            getPropId: () => id,
            getPropName: () => propName,
            getPropType: () => propType,
            getDateAdded: () => dateAdded,
            getDateUpdated: () => dateUpdated,
            getBackgroundId: () => backgroundId,
            getModelId: () => modelId,
            getApiId: () => apiId,
            getSoundId: () => soundId,
            getMovementId: () => movementId,
        });
    }
}