import BaseApi from 'service/baseApi';
class AppApi {
    client;
    constructor(client) {
        this.client = client;
    }

    loadStatistics = async () => {
        const url = "api/statistics"
        return await BaseApi.get(url);
    }
}
export default new AppApi (BaseApi);