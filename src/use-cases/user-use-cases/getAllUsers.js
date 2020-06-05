export default function createGetAllUsers({userDb}) {
    return function getAllUsers() {
        return userDb.findAll();
    }
}