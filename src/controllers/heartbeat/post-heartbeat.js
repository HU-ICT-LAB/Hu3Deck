export default function makePostHeartbeat({ createHeartbeat }) {
    return async function postSession(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const {...data } = httpRequest.body;

            const createdHeartbeat = await createHeartbeat({
                ...data
            });

            return {
                headers,
                statusCode: 200,
                body: createdHeartbeat
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