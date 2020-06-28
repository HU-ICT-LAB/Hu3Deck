export default function makePostSession({ createSession, createUser }) {
    return async function postSession(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const {...data } = httpRequest.body;
            

            if(!("user_id" in data)) {
                let user = await createUser({ ...data });
                data.user_id = user.id;
            }


            const createdSession = await createSession({
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