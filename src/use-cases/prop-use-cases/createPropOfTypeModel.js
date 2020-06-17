import { makePropModel, makePropSound, makeProp, makePropMovement, makePropPoint } from '../../entities';

export default function makeCreateOfTypePropModel({ propDb }) {
    return function(propInfo) {         
        const propInstance = makeProp(propInfo);
        const propModelInstance = makePropModel(propInfo);
        const propSoundInstance = makePropSound(propInfo);
        const propMovementInstance = makePropMovement(propInfo);
        const propPointInstance = makePropPoint(propInfo);

        const propModel = propDb.createPropOfTypeModel({
            propId: propInstance.getPropId(),
            movementId: propMovementInstance.getMovementId(),
            modelId: propModelInstance.getModelId(),
            soundId: propSoundInstance.getId(),
            PointId: propPointInstance.getPointId(),

            pointFromId: propMovementInstance.getPointFromId(),
            pointToId: propMovementInstance.getPointToId(),
            pointOuterId: propMovementInstance.getPointOuterId(),

            pointScaleId: propModelInstance.getPointScaleId(),
            pointRotationId: propModelInstance.getPointRotationId(),

            propType: propInstance.getPropType(),
            propName: propInstance.getPropName(),
            dateAdded: propInstance.getDateAdded(),
            dateUpdated: propInstance.getDateUpdated(),

            audio: propSoundInstance.getAudio(),
            volume: propSoundInstance.getVolume(),

            model: propModelInstance.getModel(),
            animationMixer: propModelInstance.getAnimationMixer(),

            xScale: propPointInstance.getXScale(),
            yScale: propPointInstance.getYScale(),
            zScale: propPointInstance.getZScale(),
            xRotation: propPointInstance.getXRotation(),
            yRotation: propPointInstance.getYRotation(),
            zRotation: propPointInstance.getZRotation(),

            movementType: propMovementInstance.getMovementType(),
            xPosition: propPointInstance.getXpos(),
            yPosition: propPointInstance.getYpos(),
            zPosition: propPointInstance.getZpos(),
            xToPosition: propPointInstance.getXToPos(),
            yToPosition: propPointInstance.getYToPos(),
            zToPosition: propPointInstance.getZToPos(),
            xOuterPosition: propPointInstance.getXOuterPos(),
            yOuterPosition: propPointInstance.getYOuterPos(),
            zOuterPosition: propPointInstance.getZOuterPos(),

            duration: propMovementInstance.getDuration(),
            loop: propMovementInstance.getLoop(),
            easing: propMovementInstance.getEasing()
        });
        return propModel;
    }
}