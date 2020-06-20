export default function buildMakePropModel({uid, sanitize}) {
    return function makePropModel({
        id = uid(),
        pointScaleId = uid(),
        pointRotationId = uid(),
        model,
        animationMixer,

    } = {}) {
        

        id = sanitize(id);
        if(id.length < 1) {
            throw new Error("Id must be valid.");
        }

        return Object.freeze({
            getModelId: () => id,
            getPointScaleId: () => pointScaleId,
            getPointRotationId: () => pointRotationId,
            getModel: () => model,
            getAnimationMixer: () => animationMixer
        });
    }
}