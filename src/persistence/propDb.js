export default function makePropDb({ getDbInstance }) {
    return Object.freeze({
        findBySceneId,
        findById,
        createPropOfTypeBackground,
        findNotActive,
        deletePropsBySceneId,
        createPropBySceneId,
        createPropOfTypeModel
    });
    
    async function findBySceneId({id: _id}) {
        let conn = await getDbInstance();

        const query = {
            name: 'findPropsById',
            text: 
                `select sp.default_shown, p.id, p.name, p.prop_type, p.date_added, p.date_updated , b.background_image_path, s.audio_path, s.volume, m.easing, m.loop, m.duration, m.movement_type, model.model_path, model.animation_mixer,
                po.x_pos as x_pos_from, po.y_pos as y_pos_from, po.z_pos as z_pos_from,
                po2.x_pos as x_pos_to, po2.y_pos as y_pos_to, po2.z_pos as z_pos_to,
                po3.x_pos as x_pos_outer, po3.y_pos as y_pos_outer, po3.z_pos as z_pos_outer,
                scalepoint.x_pos as x_pos_scale, scalepoint.y_pos as y_pos_scale, scalepoint.z_pos as z_pos_scale,
                rotpoint.x_pos as x_pos_rot, rotpoint.y_pos as y_pos_rot, rotpoint.z_pos as z_pos_rot, sp.default_shown as default_shown
                 from prop p
                 inner join scene_props sp on p.id = sp.prop_id
                 left join background b on b.id = p.background_id
                 left join sound s on p.sound_id = s.id
                 left join movement m on p.movement_id = m.id
				 left join model on p.model_id = model.id 
				 left join point scalepoint on model.point_scale_id = scalepoint.id
				 left join point rotpoint on model.point_rotation_id = rotpoint.id
                 left join point po on m.point_from_id = po.id
                 left join point po2 on m.point_to_id = po2.id
                 left join point po3 on m.point_outer_id = po3.id
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

        return [];
    }

    async function findById({ id: _id }) {
        let conn = await getDbInstance();
        const query = {
            name: 'findPropsById',
            text: 
                `select p.id, p.name, p.prop_type, p.date_added, p.date_updated , b.background_image_path, s.audio_path, s.volume, m.easing, m.loop, m.duration, m.movement_type, model.model_path, model.animation_mixer,
                po.x_pos as x_pos_from, po.y_pos as y_pos_from, po.z_pos as z_pos_from,
                po2.x_pos as x_pos_to, po2.y_pos as y_pos_to, po2.z_pos as z_pos_to,
                po3.x_pos as x_pos_outer, po3.y_pos as y_pos_outer, po3.z_pos as z_pos_outer,
                scalepoint.x_pos as x_pos_scale, scalepoint.y_pos as y_pos_scale, scalepoint.z_pos as z_pos_scale,
                rotpoint.x_pos as x_pos_rot, rotpoint.y_pos as y_pos_rot, rotpoint.z_pos as z_pos_rot
                 from prop p
                 inner join scene_props sp on p.id = sp.prop_id
                 left join background b on b.id = p.background_id
                 left join sound s on p.sound_id = s.id
                 left join movement m on p.movement_id = m.id
				 left join model on p.model_id = model.id 
				 left join point scalepoint on model.point_scale_id = scalepoint.id
				 left join point rotpoint on model.point_rotation_id = rotpoint.id
                 left join point po on m.point_from_id = po.id
                 left join point po2 on m.point_to_id = po2.id
                 left join point po3 on m.point_outer_id = po3.id
                where p.id = $1`,
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

        return [];
    }

    async function findNotActive(id){
        let conn = await getDbInstance();
        const query = {
            name: 'findPropsNotActive',
            text: 
                `select * from prop where name != '' and id not in (
                    select sp.prop_id from scene_props sp 
                    where scene_id = $1
                )`,
            values: [id]
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

    async function deletePropsBySceneId({ id: _id }){
        let conn = await getDbInstance();
        const query = {
            name: 'deletePropsBySceneId',
            text: 'DELETE FROM scene_props where scene_id = $1',
            values: [_id]
        };

        let response = 0;

        await conn.query(query).then((res) => {
            response = res.rowCount;
            conn.end();
        });

        return response;
    }

    async function createPropBySceneId({ sid: _sid, json: _json }){
        let index = 1;
        let bindParams = Array(_json.length).fill(0).map(v => `(${Array(3).fill(0).map(val => `$${index++}`).join(',')})`).join(',');
        
        let values = _json.map(v => {
            let array = Object.values(v);
            array.unshift(_sid);
            return array;
        });

        values = values.reduce((acc, v) => acc.concat(...v)); 

        let conn = await getDbInstance();
        const query = {
            name: 'insertPropBySceneId',
            text: `INSERT INTO scene_props (scene_id, prop_id, default_shown) VALUES ${bindParams}`,
            values
        };

        let response;
        await conn.query(query).then((res) => {
            response = res.rowCount;
            conn.end();
        });

        return response;
    }

    

    async function createPropOfTypeBackground({...data}) {     
        console.log(data); 
        let conn = await getDbInstance();
        const insertIntoBackgroundQuery = {
            name: 'insertBackground',
            text: `INSERT INTO background (id, background_image_path) VALUES ($1, $2)`,
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
            conn.end();
        });

        echo(__filename + thisLine(), response);

        return {...data};
    }

    async function createPropOfTypeModel({...data}) {     
        console.log(data); 
        let conn = await getDbInstance();

        const insertIntoApiQuery = {
            name: 'insertApi',
            text: `INSERT INTO api(
                id, url)
                VALUES ($1, $2);`,
            values: [data.apiId, data.url]
        };

        const insertIntoModelQuery = {
            name: 'insertModel',
            text: `INSERT INTO model(
                id, model_path, animation_mixer, point_scale_id, point_rotation_id)
                VALUES ($1, $2, $3, $4, $5);`,
            values: [data.modelId, data.model, data.animationMixer, data.pointScaleId, data.pointRotationId]
        };

        const insertIntoMovementQuery = {
            name: 'insertMovement',
            text: `INSERT INTO public.movement(
                id, point_from_id, point_to_id, point_outer_id, name, movement_type, easing, loop, duration, date_added, date_updated)
                VALUES ($1, $2, $3, $4, null, $5, $6, $7, $8, $9, $10);`,
            values: [data.movementId, data.pointFromId, data.pointToId, data.pointOuterId, data.movement, data.easing, data.loop, data.duration, data.dateAdded, data.dateUpdated]
        };

        const insertIntoSoundQuery = {
            name: 'insertSound',
            text: `INSERT INTO sound(id, audio_path, volume) VALUES ($1, $2, $3);`,
            values: [data.soundId, data.audio, data.volume]
        };
        
        const insertIntoPointOfTypeScaleQuery = {
            name: 'insertPointScale',
            text: `INSERT INTO point(
                id, x_pos, y_pos, z_pos)
                VALUES ($1, $2, $3, $4);`,
            values: [data.pointScaleId, data.xScale, data.yScale, data.zScale]
        };

        const insertIntoPointOfTypeRotationQuery = {
            name: 'insertPointRotation',
            text: `INSERT INTO point(
                id, x_pos, y_pos, z_pos)
                VALUES ($1, $2, $3, $4);`,
            values: [data.pointRotationId, data.xRotation, data.yRotation, data.zRotation]
        };

        const insertIntoPointOfTypeFromQuery = {
            name: 'insertPointFrom',
            text: `INSERT INTO point(
                id, x_pos, y_pos, z_pos)
                VALUES ($1, $2, $3, $4);`,
            values: [data.pointFromId, data.xPosition, data.yPosition, data.zPosition]
        };

        const insertIntoPointOfTypeToQuery = {
            name: 'insertPointTo',
            text: `INSERT INTO point(
                id, x_pos, y_pos, z_pos)
                VALUES ($1, $2, $3, $4);`,
            values: [data.pointToId, data.xToPosition, data.yToPosition, data.zToPosition]
        };

        const insertIntoPointOfTypeOuterQuery = {
            name: 'insertPointOuter',
            text: `INSERT INTO point(
                id, x_pos, y_pos, z_pos)
                VALUES ($1, $2, $3, $4);`,
            values: [data.pointOuterId, data.xOuterPosition, data.yOuterPosition, data.zOuterPosition]
        };

        const insertIntoPropQuery = {
            name: 'insertProp',
            text: `INSERT INTO prop(
                id, movement_id, sound_id, api_id, model_id, background_id, name, prop_type, date_added, date_updated)
                VALUES ($1, $2, $3, $4, $5, null, $6, $7, $8, $9);`,
            values: [data.propId, data.movementId, data.soundId, data.apiId, data.modelId, data.propName, data.propType, data.dateAdded, data.dateUpdated]
        };

        let response = [];

        await conn.query(insertIntoApiQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoPointOfTypeScaleQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoPointOfTypeRotationQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoPointOfTypeFromQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoPointOfTypeToQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoPointOfTypeOuterQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoSoundQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoModelQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoMovementQuery).then((res) => {
            response = res.rows;
        });

        await conn.query(insertIntoPropQuery).then((res) => {
            response = res.rows;
        });


        echo(__filename + thisLine(), response);

        return {...data};
    }
}