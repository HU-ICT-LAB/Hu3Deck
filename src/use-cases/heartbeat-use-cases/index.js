import createGetHeartbeat from './getHeartbeat';
import createCreateHeartbeat from './createHeartbeat';
import { heartbeatDb } from '../../persistence';

const httpRequest = require('node-fetch');

const getHeartbeat = createGetHeartbeat({ heartbeatDb });
const createHeartbeat = createCreateHeartbeat({ heartbeatDb, httpRequest });

const heartbeat = Object.freeze({
    getHeartbeat,
    createHeartbeat
});

export default heartbeat;

export { getHeartbeat, createHeartbeat };