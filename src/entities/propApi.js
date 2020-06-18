export default function buildMakePropApi({uid, sanitize}) {
    return function makePropApi({
        id = uid(),
        url

    } = {}) {
        

        id = sanitize(id);
        if(id.length < 1) {
            throw new Error("Id must be valid.");
        }

        return Object.freeze({
            getId: () => id,
            getUrl:() => url
        });
    }
}