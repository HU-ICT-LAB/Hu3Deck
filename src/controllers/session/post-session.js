export default function makePostSession({ createSession }) {
    return async function postSession(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const {...data } = httpRequest.body
            
            const createdSession = await createSession({
                ...data
            });

            console.log("post-session: ", createdSession);

            return {
                headers,
                statusCode: 200,
                body: createdSession
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