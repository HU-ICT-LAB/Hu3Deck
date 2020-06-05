export default function makePostScene({ createScene }) {
    return async function postScene(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const {...data } = httpRequest.body

            echo(__filename + thisLine(), httpRequest);
            
            const createdScene = await createScene({
                ...data
            });

            return {
                headers,
                statusCode: 200,
                body: createdScene
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