export default function makeListNotActiveProps({ getNotActiveProps }) {
    return async function listNotActiveProps(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
            
        };

        try {
            const id = httpRequest.params.id;

            let props = await getNotActiveProps(id);

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