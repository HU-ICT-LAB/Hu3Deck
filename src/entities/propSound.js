export default function buildMakePropSound({uid, sanitize}) {
    return function makePropSound({
        soundId = uid(),
        audio,
        volume
    }) {    
        return Object.freeze({
            getId: () => soundId,
            getAudio: () => audio,
            getVolume: () => volume
        });
    }
}