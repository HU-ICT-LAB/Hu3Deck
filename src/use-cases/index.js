import { makeGetSession, makeUpdateSession } from './session-use-cases/'; 
import { sessionDb } from '../../persistence';

const getSessions = makeGetSession({ sessionDb });
const updateSession = makeUpdateSession({ sessionDb });

// idont think we use this index.js
export {
    //session 
    getSessions,
    updateSession,
    //heartbeat

};