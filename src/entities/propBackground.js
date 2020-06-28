export default function buildMakePropBackground({uid, sanitize}) {
    return function makePropBackground({
        backgroundId = uid(),
        backgroundImage,
    }) {    
        return Object.freeze({
            getId: () => backgroundId,
            getBackgroundImage: () => backgroundImage,
        });
    }
}