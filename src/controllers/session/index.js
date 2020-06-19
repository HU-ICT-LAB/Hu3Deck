import makeListSession from './list-session';
import makePostSession from './post-session';
import makeListActiveSession from './list-active-session';
import makePutSession from './put-session';

import { getSessions, createSession, getActiveSession, updateSession } from '../../use-cases/session-use-cases';
import { createUser } from '../../use-cases/user-use-cases';

const listActiveSession = makeListActiveSession({ getActiveSession });
const listSessions = makeListSession({ getSessions }); 
const postSession = makePostSession({ createSession, createUser });
const putSession = makePutSession({ updateSession });

const sessionController = Object.freeze({
    listSessions,
    postSession,
    listActiveSession,
    putSession
});

export default sessionController;
export { listSessions, postSession, listActiveSession, putSession };