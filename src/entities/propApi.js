export default function buildMakePropApi({uid, sanitize}) {
    return function makePropApi({
        id = uid(),
        //webhook gegevens uit de form sluiten niet aan aan de database gegevens
        //moet nog met arjan bespreken hoe dat zit dus voor nu insert zonder
        //webhook.

    } = {}) {
        

        id = sanitize(id);
        if(id.length < 1) {
            throw new Error("Id must be valid.");
        }

        return Object.freeze({

        });
    }
}