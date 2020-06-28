export default function makeListSession({ getSessions }) {
    return async function listSession(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            let sessions = await getSessions({
                id: httpRequest.params.id
            });

            return {
                headers,
                statusCode: 200,
                body: sessions
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