export default function makeSessionDb({ getDbInstance }) {
    return Object.freeze({
        findById,
        create,
        remove,
        update,
        findAll,
        findActive
    });

    // selects the active session
    async function findActive() {
        let conn = await getDbInstance();

        const query = {
            name: 'findSessionById',
            text: 'SELECT * FROM session WHERE date_ended IS NULL',
            values: [],
        };

        let response = [];
        
        await conn.query(query).then((res) => {
            response = res.rows;
            conn.end();
        });

        if(response.length > 0) {
            return response[0];
        }

        return {};
    }

    async function findAll() {
        let conn = getDbInstance();

        return [
            {
                id: 1,
                name:"testsession",
                userId: 1,
                sceneId: 1
            },
            {
                id: 2,
                name:"testsession2",
                userId: 2,
                sceneId: 2
            }
        ];
    }

    // selects session by the parameter id
    async function findById({id: _id}) {
        let conn = await getDbInstance();

        const query = {
            name: 'findSessionById',
            text: 'SELECT * FROM session WHERE id = $1 AND date_ended IS NULL',
            values: [_id],
        };

        let response = [];
        
        await conn.query(query).then((res) => {
            response = res.rows;
            conn.end();
        });

        if(response.length > 0) {
            return response[0];
        }

        return {};
    }

    // inserts a session
    async function create({...data}) {
        let conn = await getDbInstance();

        const query = {
            name: 'createSession',
            text: 'INSERT INTO session (id, name, user_id, scene_id, date_started) VALUES ($1, $2, $3, $4, $5)',
            values: [data.id, data.name, data.user_id, data.scene_id, data.date_started],
        };

        let response = [];

        await conn.query(query).then((res) => {
            response = res.rows;
            conn.end();
        });

        return {...data};
    }

    async function remove({id: _id}) {
        //implement removing(deleting)(soft?) session

        return {};
    }


    // updates the scene of the session
    async function update({id: _id, ...data}) {
        console.log(_id, data);
        let conn = await getDbInstance();

        const query = {
            name: 'updateSession',
            text: 'UPDATE session SET scene_id = $1 WHERE id = $2',
            values: [data.scene_id, _id],
        };

        let response = [];

        await conn.query(query).then((res) => {
            response = {rowCount: res.rowCount};
            conn.end();
        });

        return response;
    }
    


}