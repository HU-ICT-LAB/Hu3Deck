import { makeHeartbeat } from './../../entities/';
export default function createCreateHeartbeat({heartbeatDb, httpRequest}) {
    return async function createHeartbeat(requestData) {
        // const heartbeat = makeHeartbeat({...requestData});

        console.log(requestData);

        // if(!sessionId) {
        //     throw new Error("Session id must be set when searching for heartbeat.");
        // }

        const headers = {
            Authorization: " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkJRVkMiLCJzdWIiOiI4SFNNVlkiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyaHIiLCJleHAiOjE1OTI5OTIzNjYsImlhdCI6MTU5MjM4NzU2Nn0.9qGNt5PUm9TDCLysWREw4X5aWP5TYFUCTWBvt5cv8Ec"
        }

        let jsonData;

        var currentDate = new Date();
        var oldDate = new Date(new Date() - 900000);

        var datetimeUntil = (`0${currentDate.getHours().toString()}`).slice(-2) + ":" +
            	        (`0${currentDate.getMinutes().toString()}`).slice(-2)
        var datetimeFrom = (`0${oldDate.getHours().toString()}`).slice(-2) + ":" +
                        (`0${oldDate.getMinutes().toString()}`).slice(-2);
        
        let period = datetimeFrom + "/" + datetimeUntil;

        var url = "https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec/time/" + period + ".json";
        console.log(url);

        await httpRequest(url, { method: 'GET', headers: headers })
            .then(res => res.json())
            .then(json => jsonData = json['activities-heart-intraday']['dataset']);

        return jsonData;
    }
}