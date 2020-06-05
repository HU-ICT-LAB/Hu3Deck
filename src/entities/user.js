export default function createMakeUser({ uid }) {
    return function makeUser({
        id = uid(),
        firstname,
        middlename,
        lastname,
        age
    }) {






        return Object.freeze({
            
        });
    }
}