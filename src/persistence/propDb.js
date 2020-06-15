export default function makePropDb({ getDbInstance }) {
    return Object.freeze({
        findBySceneId
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


    


}