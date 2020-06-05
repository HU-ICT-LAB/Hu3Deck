export default function makeListAllUsers({ getAllUsers }) {
    return async function listAllUsers(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            let users = await getAllUsers();

            return {
                headers,
                statusCode: 200,
                body: users
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