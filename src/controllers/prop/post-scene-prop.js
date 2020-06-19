export default function makePostSceneProps({ createSceneProps }) {
    return async function postSceneProps(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        let id = httpRequest.params.id;

        try {
            let props = await createSceneProps({
                id,
                ...httpRequest.body
            });

            return {
                headers,
                statusCode: 200,
                body: {rowCount: props}
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