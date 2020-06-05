const shortid = require('shortid');
const sanitizeHtml = require('sanitize-html');

import buildMakeSession from './session';
import buildMakeHeartbeat from './heartbeat';
import buildMakeScene from './scene';
import buildMakeProp from './prop';


const makeSession = buildMakeSession({uid, sanitize});
const makeHeartbeat = buildMakeHeartbeat({uid});
const makeScene = buildMakeScene({uid});
const makeProp = buildMakeProp({});

function sanitize(text) {
    return sanitizeHtml(text, {
        allowedTags: ['b', 'i', 'u']
    });
}

function uid() {
    return shortid.generate();
}

export default { makeSession, makeHeartbeat, makeScene, makeProp }
export { makeSession, makeHeartbeat, makeScene, makeProp }