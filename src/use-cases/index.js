import { makeGetSession, makeUpdateSession } from './session-use-cases/'; 
import { sessionDb } from '../../persistence';

const getSessions = makeGetSession({ sessionDb });
const updateSession = makeUpdateSession({ sessionDb });


export {
    //session 
    getSessions,
    updateSession,
    //heartbeat

};