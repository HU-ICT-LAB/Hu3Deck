import { sessionDb, userDb, sceneDb, propDb } from '../../persistence';
import makeGetSession from './getSession';
import makeUpdateSession from './updateSession';
import makeCreateSession from './createSession';
import makeGetActiveSession from './getActiveSession';

const getActiveSession = makeGetActiveSession({ sessionDb, sceneDb, propDb });
const getSessions = makeGetSession({ sessionDb });
const updateSession = makeUpdateSession({ sessionDb });
const createSession = makeCreateSession({ sessionDb, userDb, sceneDb });

const session = Object.freeze({
    getSessions,
    updateSession,
    createSession,
    getActiveSession
});


export default session;

export { getSessions, updateSession, createSession, getActiveSession };