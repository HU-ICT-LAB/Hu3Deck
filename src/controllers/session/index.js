import makeListSession from './list-session';
import makePostSession from './post-session';

import { getSessions, createSession } from '../../use-cases/session-use-cases';


const listSessions = makeListSession({ getSessions }); 
const postSession = makePostSession({ createSession })

const sessionController = Object.freeze({
    listSessions,
    postSession
});

export default sessionController;
export { listSessions, postSession };