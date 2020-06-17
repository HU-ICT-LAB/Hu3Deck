const { Client } = require('pg');
import makeSessionDb from './sessionDb';
import makeUserDb from './userDb';
import makeSceneDb from './sceneDb';
import makePropDb from './propDb';
import makeHeartbeatDb from './heartbeatDb';

const sessionDb = makeSessionDb({ getDbInstance });
const userDb = makeUserDb({ getDbInstance });
const sceneDb = makeSceneDb({ getDbInstance });
const propDb = makePropDb({ getDbInstance });
const heartbeatDb = makeHeartbeatDb({ getDbInstance });

async function getDbInstance() {
    let client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
    });

    client.connect();

    

    return client;
}

export default { sessionDb, userDb, sceneDb, propDb, heartbeatDb };

export { sessionDb, userDb, sceneDb, propDb, heartbeatDb };