import { makePropBackground, makePropSound, makeProp } from '../../entities';

export default function makeCreateOfTypePropBackground({ propDb }) {
    return function(propInfo) {   
        
        // makes prop background from entities
        const propBackgroundInstance = makePropBackground(propInfo);
        const propSoundInstance = makePropSound(propInfo);
        const propInstance = makeProp(propInfo);

        // calls function createPropOfTypeBackground from propDb
        const propBackground = propDb.createPropOfTypeBackground({
            backgroundId: propBackgroundInstance.getId(),
            soundId: propSoundInstance.getId(),
            propId: propInstance.getPropId(),
            propType: propInstance.getPropType(),
            propName: propInstance.getPropName(),
            backgroundImage: propBackgroundInstance.getBackgroundImage(),
            audio: propSoundInstance.getAudio(),
            volume: propSoundInstance.getVolume(),
            dateAdded: propInstance.getDateAdded(),
            dateUpdated: propInstance.getDateUpdated()
        });
        return propBackground;
    }
}