export default function makeListPropById({ getPropById }) {
    return async function listPropById(socketData) {
        try {
            return await getPropById({
                id: socketData.id
            });

        } catch (e) {
            console.log(e);
            return {
                error: e.message
            }
        }
    }
}