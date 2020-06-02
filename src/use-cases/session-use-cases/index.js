import { sessionDb } from '../../persistence';
import makeGetSession from './getSession';
import makeUpdateSession from './updateSession';
import makeCreateSession from './createSession';


const getSessions = makeGetSession({ sessionDb });
const updateSession = makeUpdateSession({ sessionDb });
const createSession = makeCreateSession({ sessionDb })

const session = Object.freeze({
    getSessions,
    updateSession,
    createSession
});


export default session;

export { getSessions, updateSession, createSession};