export default function createGetAllScenes({ sceneDb }) {
    return async function getAllScenes() {
        const allScenes = await sceneDb.findAll();

        return allScenes;
    }
}