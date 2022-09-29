import BaseApi from 'service/baseApi';
class AccreditationApi {
    client;
    constructor(client) {
        this.client = client;
    }
    loadSingleAccreditation = async (id) => {
        const url = `api/accreditations/${id}`
        return await BaseApi.get(url);
    }
    loadAccreditationList = async () => {
        const url = "api/accreditations"
        return await BaseApi.get(url);
    }
    createAccreditation = async (params) => {
        const url = "api/accreditations"
        return await BaseApi.post(url, params);
    }
    updateAccreditation = async (params,id) => {
        const url = `api/accreditations/${id}`
        return await BaseApi.post(url, params);
    }
    deleteAccreditation =async (id) => {
        const url = `api/accreditations/${id}`
        return await BaseApi.delete(url);
    }

}
export default new AccreditationApi (BaseApi);