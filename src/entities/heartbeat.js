export default function createMakeHeartbeat({uid}) {
    return function makeHeartbeat({
        id = uid(),
        measurement_date = Date.now(),
        bpm,
        sessionId
    }) {


        if(!bpm) {
            throw new Error("Bpm is needed to properly measure the heartbeat.");
        }

        if(!sessionId) {
            throw new Error("Session needs to be set.");
        }

        
        return Object.freeze({
            getId: () => id,
            getBpm: () => bpm,
            getSessionId: () => sessionId,
            getMeasurementDate: () => measurement_date
        });
    }
}