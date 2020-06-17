export default function makeListHeartbeat({ getHeartbeat }) {
    return async function listHeartbeat(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            let heartbeats = await getHeartbeat({
                id: httpRequest.params.id
            });

            return {
                headers,
                statusCode: 200,
                body: heartbeats
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