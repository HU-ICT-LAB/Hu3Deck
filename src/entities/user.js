export default function buildMakeUser({ uid, sanitize }) {
    return function makeUser({
        id = uid(),
        firstname,
        middlename,
        lastname,
        age,
        date_added = new Date(),
        date_updated
    }) {

        if(!firstname || firstname.length < 1) {
            throw new Error("User has to have a firstname.");
        }
        firstname = sanitize(firstname);


        if(middlename && middlename.length > 1) {
            middlename = sanitize(middlename);
        }
        

        if(!lastname || lastname.length < 1) {
            throw new Error("User has to have a lastname.");
        }
        lastname = sanitize(lastname);


        if(!age || age.length < 1) {
            throw new Error("User has to have a age.");
        }
        age = sanitize(age);


        return Object.freeze({
            getId: () => id,
            getFirstname: () => firstname,
            getMiddlename: () => middlename,
            getLastname: () => lastname,
            getAge: () => age,
            getDateAdded: () => date_added,
            getDateUpdated: () => date_updated,
            toObject: () => {
                return {
                    id,
                    firstname,
                    middlename,
                    lastname,
                    age,
                    date_added,
                    date_updated
                }
            }
        });
    }
}