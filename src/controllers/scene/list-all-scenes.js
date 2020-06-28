export default function makeListAllScenes({ getAllScenes }) {
    return async function listAllScenes(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            let scenes = await getAllScenes();

            return {
                headers,
                statusCode: 200,
                body: scenes
            }


        } catch (e) {
            console.log(e);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}