import BaseApi from 'service/baseApi';
class AuthApi {
    client;
    constructor(client) {
        this.client = client;
    }

    login = async (data) => {
        const url = "api/login"
        return await BaseApi.post(url, data);
    }
    getUserInfo = async () => {
        const url = "api/auth"
        return await BaseApi.get(url);
    }
}
export default new AuthApi(BaseApi);