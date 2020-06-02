const shortid = require('shortid');
const sanitizeHtml = require('sanitize-html');

import buildMakeSession from './session';
import buildMakeHeartbeat from './heartbeat';
import buildMakeScene from './scene';


const makeSession = buildMakeSession({uid, sanitize});
const makeHeartbeat = buildMakeHeartbeat({uid});
const makeScene = buildMakeScene({uid});

function sanitize(text) {
    return sanitizeHtml(text, {
        allowedTags: ['b', 'i', 'u']
    });
}

function uid() {
    return shortid.generate();
}

export default { makeSession, makeHeartbeat, makeScene }
export { makeSession, makeHeartbeat, makeScene }