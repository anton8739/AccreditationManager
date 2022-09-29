import BaseApi from 'service/baseApi';
class RoleApi {
    client;
    constructor(client) {
        this.client = client;
    }

    loadRolesList = async () => {
        const url = "api/roles"
        return await BaseApi.get(url);
    }
    createRole = async (params) => {
        const url = "api/roles"
        return await BaseApi.post(url, params);
    }
    updateRole = async (params,id) => {
        const url = `api/roles/${id}`
        return await BaseApi.put(url, params);
    }
    deleteRole =async (id) => {
        const url = `api/roles/${id}`
        return await BaseApi.delete(url);
    }
    toggleSaveRole = async (params, id) => {
        const url = `api/roles/${id}/favorite`
        return await BaseApi.patch(url,params);
    }
}
export default new RoleApi (BaseApi);