export default function makeListActiveSession({ getActiveSession }) {
    return async function listActiveSession(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
            
        };

        try {

            let session = await getActiveSession();

            return {
                headers,
                statusCode: 200,
                body: session
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