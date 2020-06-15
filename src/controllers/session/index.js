import makeListSession from './list-session';
import makePostSession from './post-session';
import makeListActiveSession from './list-active-session';

import { getSessions, createSession, getActiveSession } from '../../use-cases/session-use-cases';
import { createUser } from '../../use-cases/user-use-cases';

const listActiveSession = makeListActiveSession({ getActiveSession });
const listSessions = makeListSession({ getSessions }); 
const postSession = makePostSession({ createSession, createUser });

const sessionController = Object.freeze({
    listSessions,
    postSession,
    listActiveSession
});

export default sessionController;
export { listSessions, postSession, listActiveSession };