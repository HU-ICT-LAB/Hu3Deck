import makeListHeartbeat from './list-heartbeat';
import makePostHeartbeat from './post-heartbeat';

import { getHeartbeat, createHeartbeat } from '../../use-cases/heartbeat-use-cases';

const listHeartbeat = makeListHeartbeat({ getHeartbeat });
const postHeartbeat = makePostHeartbeat({ createHeartbeat });

const heartbeatController = Object.freeze({
    listHeartbeat,
    postHeartbeat
});

export default heartbeatController;
export { listHeartbeat, postHeartbeat };