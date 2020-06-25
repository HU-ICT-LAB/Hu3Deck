import { makeHeartbeat, makeFitbit } from './../../entities/';
export default function createCreateHeartbeat({heartbeatDb, fitbitDb, httpRequest}) {
    return async function createHeartbeat(requestData) {

        var minutes;
        var ms;

        if (requestData['minutes'] == '') {
            ms = 900000;
        }
        else {
            minutes = parseInt(requestData['minutes']);

            if (minutes < 1 || minutes > 60) {
                ms = 900000;
            }
            else {
                ms = minutes * 60000;
            }
        }
        


        var currentDate = new Date();
        var oldDate = new Date(new Date() - ms);

        let fitbitObject = await fitbitDb.findAll();

        const headers1 = {
            Authorization: `Basic ${process.env.FITBIT_API_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }
        const headers2 = {
            Authorization: ` Bearer ${fitbitObject[0]['access_token']}`
        }
        
        if (fitbitObject[0]['date'] < (currentDate - 14400000)) {
            try {
                await httpRequest(`https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${fitbitObject[0]['refresh_token']}`, {
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
                    headers2['Authorization'] = ` Bearer ${json['access_token']}`;
                });
            } catch (err) {
                throw new Error(err);
            }
        } 
        
        let jsonData;

        var datetimeUntil = (`0${currentDate.getHours().toString()}`).slice(-2) + ":" +
                        (`0${currentDate.getMinutes().toString()}`).slice(-2)
        var datetimeFrom = (`0${oldDate.getHours().toString()}`).slice(-2) + ":" +
                        (`0${oldDate.getMinutes().toString()}`).slice(-2);
        
        let period = `${datetimeFrom}/${datetimeUntil}`;
        console.log(period);

        var url = `https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min/time/${period}.json`;

        jsonData = await httpRequest(url, { method: 'GET', headers: headers2 })
            .then(res => res.json())
            .then(json => jsonData = json['activities-heart-intraday']['dataset']);

        return jsonData;
    }
}