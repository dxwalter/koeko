
let headers = function (context) {
    return {
        httpEndpoint: process.env.API_END_POINT,
        httpLinkOptions: {
            headers:{
                accessToken: context
            }
        }
    }
}


export default headers