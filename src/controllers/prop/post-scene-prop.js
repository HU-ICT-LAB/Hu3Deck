export default function makePostSceneProps({ postSceneProps }) {
    return async function postSceneProps(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
            
        };

        try {
            let props = await postSceneProps({
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