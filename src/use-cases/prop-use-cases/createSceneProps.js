import { makeProp } from '../../entities';
export default function makeCreateSceneProps({ propDb }) {
    return function createSceneProps(propInfo) {   
        const propDataJson = JSON.parse(propInfo.allowedProps);
        const deleteProps = propDb.deletePropsBySceneId({id: propInfo.id});

        //checks if the length of json is smaller than 1 to return 0 rowcounts to create
        if(propDataJson.length < 1) {
            return 0;
        }
        // else return x rowcounts that has been created
        const propInstance = propDb.createPropBySceneId({sid: propInfo.id, json: propDataJson});
        return propInstance;
    }
}