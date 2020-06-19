export default function makeFitbitDb({ getDbInstance }) {
    return Object.freeze({
        findAll,
        update
    });

    async function findAll() {
        let conn = await getDbInstance();

        const query = {
            name: 'findAllFitbit',
            text: 'SELECT * FROM fitbit',
            values: [],
        };

        let response = [];
        
        await conn.query(query).then((res) => {
            response = res.rows;
            conn.end();
        });


        if(response.length > 0) {
            return response;
        }


        return [];
    }

    async function update({...data}) {
        let conn = await getDbInstance();

        const query = {
            name: 'updateFitbit',
            text: 'UPDATE fitbit SET access_token = $1, refresh_token = $2, date = $3) WHERE access_token = $4',
            values: [data.access_token, data.refresh_token, data.date, data.old_access_token],
        };

        let response = [];

        await conn.query(query).then((res) => {
            response = res.rows;
            conn.end();
        });

        return {...data};
    }
}