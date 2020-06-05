
import makeListAllUsers from './list-all-users';
import makePostUser from './post-user';

import { getAllUsers, createUser } from '../../use-cases/user-use-cases';


const listAllUsers = makeListAllUsers({ getAllUsers });
const postUser = makePostUser({ createUser });

const sessionController = Object.freeze({
    listAllUsers,
    postUser
});

export default sessionController;
export { listAllUsers, postUser };