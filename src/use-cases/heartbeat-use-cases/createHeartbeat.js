import { makeHeartbeat, makeFitbit } from './../../entities/';
export default function createCreateHeartbeat({heartbeatDb, fitbitDb, httpRequest}) {
    return async function createHeartbeat(requestData) {
        // const heartbeat = makeHeartbeat({...requestData});

        // if(!sessionId) {
        //     throw new Error("Session id must be set when searching for heartbeat.");
        // }

        var currentDate = new Date();
        var oldDate = new Date(new Date() - 900000);

        let fitbitObject = await fitbitDb.findAll();

        const headers1 = {
            Authorization: "Basic MjJCUVZDOjRlNDEzOTg1Y2Q3YzBlYzk4NTQ1ZjRhYzEwMzY2YjQ0",
            Application: "application/x-www-form-urlencoded"
        }
        const headers2 = {
            Authorization: " Bearer " + fitbitObject[0]['access_token']
        }

        //14400000

        if (fitbitObject[0]['date'] < (currentDate - 3600000)) {
            await httpRequest("https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=" + fitbitObject[0]['refresh_token'], {
                method: 'POST',
                headers: headers1
            })
            .then(res => res.json())
            .then(json => {
                fitbitDb.update({
                    access_token: json['access_token'],
                    refresh_token: json['refresh_token'],
                    date: new Date(),
                    old_access_token: fitbitObject[0]['access_token']
                });
                headers2['Authorization'] = " Bearer " + json['access_token'];
            });
        } else {
            let jsonData;

            var datetimeUntil = (`0${currentDate.getHours().toString()}`).slice(-2) + ":" +
                            (`0${currentDate.getMinutes().toString()}`).slice(-2)
            var datetimeFrom = (`0${oldDate.getHours().toString()}`).slice(-2) + ":" +
                            (`0${oldDate.getMinutes().toString()}`).slice(-2);
            
            let period = datetimeFrom + "/" + datetimeUntil;

            var url = "https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec/time/" + period + ".json";

            await httpRequest(url, { method: 'GET', headers: headers2 })
                .then(res => res.json())
                .then(json => jsonData = json['activities-heart-intraday']['dataset']);

            return jsonData;
        }
    }
}