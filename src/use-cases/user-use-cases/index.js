import { userDb } from '../../persistence';
import makeGetAllUsers from './getAllUsers';
import makeCreateUSer from './createUser';

const getAllUsers = makeGetAllUsers({ userDb });
const createUser = makeCreateUSer({ userDb });


const session = Object.freeze({
    getAllUsers,
    createUser
});


export default session;

export { getAllUsers, createUser };