export default function makeSessionDb({ getDbInstance }) {
    return Object.freeze({
        findById,
        create,
        remove,
        update,
        findAll
    });

    async function findAll() {


        return [
            {
                id: 1,
                name:"testsession",
                userId: 1,
                sceneId: 1
            },
            {
                id: 2,
                name:"testsession2",
                userId: 2,
                sceneId: 2
            }
        ];
    }

    //returns a plain js-object with data when something has been found.
    async function findById({id: _id}) {
        return {
            id: _id,
            name:"testsession",
            userId: 1,
            sceneId: 1
        };
    }

    async function create({...data}) {
        //implement inserting session

        return {};
    }

    async function remove({id: _id}) {
        //implement removing(deleting)(soft?) session

        return {};
    }

    async function update({id: _id, ...data}) {
        //implement updating session.

        return {};
    }
    


}