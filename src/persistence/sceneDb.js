export default function makeSceneDb({ getDbInstance }) {
    return Object.freeze({
        findById,
        create,
        remove,
        update,
        findAll
    });

    // returns all scenes that are found
    async function findAll() {
        let conn = await getDbInstance();

        const query = {
            name: 'findAllScenes',
            text: 'SELECT * FROM scene',
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

    // this function returns the scene based on the parameter id
    async function findById({id: _id}) {
        let conn = await getDbInstance();

        const query = {
            name: 'findSceneById',
            text: 'SELECT * FROM scene WHERE id = $1',
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

    // this function create a new scene based on the parameter ...data
    async function create({...data}) {
        let conn = await getDbInstance();
        const query = {
            name: 'createScene',
            text: 'INSERT INTO scene (id, title) VALUES ($1, $2)',
            values: [data.id, data.title]
        };

        let response = [];

        await conn.query(query).then((res) => {
            response = res.rows;
        });

        echo(__filename + thisLine(), response);

        return {...data};
    }

    async function remove({id: _id}) {
        

        return {};
    }

    async function update({id: _id, ...data}) {
        

        return {};
    }


}