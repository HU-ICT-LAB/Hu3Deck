export default function createMakeFitbit({uid}) {
    return function makeFitbit({
        access_token,
        refresh_token,
        date
    }) {  
        
        return Object.freeze({
            getAccessToken: () => access_token,
            getRefreshToken: () => refresh_token,
            getDate: () => date
        });
    }
}