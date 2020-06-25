export default function makeUserDb({ getDbInstance }) {
    return Object.freeze({
        findById,
        create,
        remove,
        update,
        findAll
    });


    // selects all users
    async function findAll() {
        let conn = await getDbInstance();

        const query = {
            name: 'findSceneById',
            text: 'SELECT * FROM public.user',
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

        return {};
    }

    // selects user by the parameter id
    async function findById({id: _id}) {
        let conn = await getDbInstance();

        const query = {
            name: 'findSceneById',
            text: 'SELECT * FROM public.user WHERE id = $1',
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

    // inserts user by the parameter data
    async function create({...data}) {
        let conn = await getDbInstance();
        
        const query = {
            name: 'createUser',
            text: 'INSERT INTO public.user (id, name, middlename, lastname, age, date_added) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [data.id, data.firstname, data.middlename, data.lastname, data.age, data.date_added],
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
        

        return {};
    }

    async function update({id: _id, ...data}) {
        

        return {};
    }


}