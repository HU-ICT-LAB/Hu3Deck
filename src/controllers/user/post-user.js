export default function makePostUser({ createUser }) {
    return async function postUser(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const {...data } = httpRequest.body;
            
            const createdUser = await createUser({
                ...data
            });

            return {
                headers,
                statusCode: 200,
                body: createdUser
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