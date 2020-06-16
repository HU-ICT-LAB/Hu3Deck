export default function makePropDb({ getDbInstance }) {
    return Object.freeze({
        findBySceneId,
        createPropOfTypeBackground
    });
    
    async function findBySceneId({id: _id}) {
        let conn = await getDbInstance();

        const query = {
            name: 'findPropsById',
            text: 
                `select p.*, b.background_image_path from prop 
                p inner join 
                scene_props sp on p.id = sp.prop_id
                left join background b 
                on b.id = p.background_id
                where sp.scene_id = $1`,
            values: [_id],
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

    async function createPropOfTypeBackground({...data}) {     
        console.log(data); 
        let conn = await getDbInstance();
        const insertIntoBackgroundQuery = {
            name: 'insertBackground',
            text: `INSERT INTO background (id ,background_image_path) VALUES ($1, $2)`,
            values: [data.backgroundId, data.backgroundImage]
        };

        const insertIntoSoundQuery = {
            name: 'insertSound',
            text: `INSERT INTO sound(id, audio_path, volume) VALUES ($1, $2, $3);`,
            values: [data.soundId, data.audio, data.volume]
        };

        const insertIntoPropQuery = {
            name: 'insertProp',
            text: `INSERT INTO prop(
                id, movement_id, sound_id, api_id, model_id, background_id, name, prop_type, date_added, date_updated)
                VALUES ($1, null, $2, null, null, $3, $4, $5, $6, $7);`,
            values: [data.propId, data.soundId, data.backgroundId, data.propName, data.propType, data.dateAdded, data.dateUpdated]
        };        

        let response = [];

        await conn.query(insertIntoBackgroundQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoSoundQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoPropQuery).then((res) => {
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