export default function makePropDb({ getDbInstance }) {
    return Object.freeze({
        findBySceneId
    });
    
    async function findBySceneId({id: _id}) {
        let conn = await getDbInstance();

        const query = {
            name: 'findPropsById',
            text: 'select p.* from prop p join scene_props sp on p.id = sp.prop_id where sp.scene_id = $1',
            values: [_id],
        };

        let response = [];
        
        await conn.query(query).then((res) => {
            response = res.rows;
        });

        if(response.length > 0) {
            return response;
        }

        return {};
    }


    


}