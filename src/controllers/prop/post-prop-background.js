export default function makePostPropBackground({ createPropOfTypeBackground }) {
    return async function postPropBackground(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const {...data } = httpRequest.body;
            
            const createdPropOfTypeBackground = await createPropOfTypeBackground({
                ...data
            });

            return {
                headers,
                statusCode: 200,
                body: createdPropOfTypeBackground
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