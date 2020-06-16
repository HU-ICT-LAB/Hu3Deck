const shortid = require('shortid');
const sanitizeHtml = require('sanitize-html');

import buildMakeSession from './session';
import buildMakeHeartbeat from './heartbeat';
import buildMakeScene from './scene';
import buildMakeUser from './user';
import buildMakePropBackground from './propBackground';
import buildMakePropSound from './propSound';
import buildMakeProp from './prop';


const makeUser = buildMakeUser({ uid, sanitize });
const makeSession = buildMakeSession({uid, sanitize});
const makeHeartbeat = buildMakeHeartbeat({uid});
const makeScene = buildMakeScene({uid});
const makePropBackground = buildMakePropBackground({uid});
const makePropSound = buildMakePropSound({uid});
const makeProp = buildMakeProp({uid, sanitize})

function sanitize(text) {
    return sanitizeHtml(text, {
        allowedTags: ['b', 'i', 'u']
    });
}

function uid() {
    return shortid.generate();
}

export default { makeSession, makeHeartbeat, makeScene, makeUser, makePropBackground, makePropSound, makeProp }
export { makeSession, makeHeartbeat, makeScene, makeUser, makePropBackground, makePropSound, makeProp }