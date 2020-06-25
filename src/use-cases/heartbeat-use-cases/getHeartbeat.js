export default function createGetHeartbeat({heartbeatDb}) {
    return function getHeartbeat(sessionId) {
        
        if(!sessionId) {
            throw new Error("Session id must be set when searching for heartbeat.");
        }


        return heartbeats;
    }
}