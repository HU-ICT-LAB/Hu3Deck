export default function makePostPropModel({ createPropOfTypeModel }) {
    return async function postPropModel(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const {...data } = httpRequest.body

            // echo(__filename + thisLine(), httpRequest);
            
            const createdPropOfTypeModel = await createPropOfTypeModel({
                ...data
            });

            return {
                headers,
                statusCode: 200,
                body: createdPropOfTypeModel
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