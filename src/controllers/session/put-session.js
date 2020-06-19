import { createSession } from "../../use-cases/session-use-cases";

export default function makePutSession({ updateSession }) {
    return async function putSession(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            console.log(httpRequest);

            const {...data } = httpRequest.body
            

            const createdSession = await updateSession({
                ...data
            });

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