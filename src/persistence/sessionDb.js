export default function makeSessionDb({ getDbInstance }) {
    return Object.freeze({
        findById,
        create,
        remove,
        update,
        findAll
    });

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

        echo(__filename + thisLine(), response);

        return {...data};
    }

    async function remove({id: _id}) {
        //implement removing(deleting)(soft?) session

        return {};
    }

    async function update({id: _id, ...data}) {
        //implement updating session.

        return {};
    }
    


}