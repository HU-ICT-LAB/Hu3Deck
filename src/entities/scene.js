export default function createMakeScene({ uid }) {
    return function makeScene({
        id = uid(),
        title,
    }) {
        

        
        return Object.freeze({
            getId: () => id,
            getTitle: () => title
        });
    }
}