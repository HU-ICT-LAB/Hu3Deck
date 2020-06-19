import { makeProp } from '../../entities';
export default function makeCreateSceneProps({ propDb }) {
    return function createSceneProps(propInfo) {   
        const propDataJson = JSON.parse(propInfo.allowedProps);
        const deleteProps = propDb.deletePropsBySceneId({id: propInfo.id});

        if(propDataJson.length < 1) {
            return 0;
        }

        const propInstance = propDb.createPropBySceneId({sid: propInfo.id, json: propDataJson});
        return propInstance;
    }
}