export default function buildMakeProp({uid, sanitize}) {
    return function makeProp({
        id = uid(),
        name
    } = {}) {
        

        id = sanitize(id);
        if(id.length < 1) {
            throw new Error("Id must be valid.");
        }




        return Object.freeze({
            toObject: () => {
                return {
                    id,
                    name
                }
            }
        });
    }
}