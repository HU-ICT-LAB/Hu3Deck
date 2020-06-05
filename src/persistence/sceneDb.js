export default function makeSceneDb({ getDbInstance }) {
    return Object.freeze({
        findById,
        create,
        remove,
        update,
        findAll
    });

    async function findAll() {


        return [
            
        ];
    }

    async function findById({id: _id}) {
        let conn = await getDbInstance();
        echo(__filename + thisLine(), _id);

        const query = {
            name: 'findSceneById',
            text: 'SELECT * FROM scene WHERE id = $1',
            values: [_id],
        };

        let response = [];
        
        await conn.query(query).then((res) => {
            response = res.rows;
        });


        if(response.length > 0) {
            return response[0];
        }


        return {};
    }

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