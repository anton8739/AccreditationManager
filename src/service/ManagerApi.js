import BaseApi from 'service/baseApi';
class ManagerApi {
    client;
    constructor(client) {
        this.client = client;
    }

    loadManagerAccessList = async () => {
        const url = "api/managers"
        return await BaseApi.get(url);
    }
    createManagerAccess = async (params) => {
        const url = "api/managers"
        return await BaseApi.post(url, params);
    }
    updateManagerAccess = async (params,id) => {
        const url = `api/managers/${id}`
        return await BaseApi.put(url, params);
    }
    deleteManager =async (id) => {
        const url = `api/managers/${id}`
        return await BaseApi.delete(url);
    }

}
export default new ManagerApi (BaseApi);