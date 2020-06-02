import makeSessionDb from './sessionDb';


const sessionDb = makeSessionDb({ getDbInstance });


async function getDbInstance() {
    //get db instance implementation.
}

export default { sessionDb };

export { sessionDb };