export default function makeListSceneProps({ getSceneProps }) {
    return async function listSceneProps(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
            
        };

        try {
            console.log(httpRequest);
            let props = await getSceneProps({
                id: httpRequest.params.id
            });

            return {
                headers,
                statusCode: 200,
                body: props
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