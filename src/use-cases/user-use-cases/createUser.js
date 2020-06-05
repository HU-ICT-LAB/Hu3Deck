import { makeUser } from './../../entities/';
export default function makeCreateUser({ userDb }) {
    return function createUser({ ...requestData }) {

        const user = makeUser({ ...requestData });
        
        return userDb.create({ ...user.toObject() });
    }
}