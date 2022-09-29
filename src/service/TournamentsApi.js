import BaseApi from 'service/baseApi';
class TournamentsApi {
    client;
    constructor(client) {
        this.client = client;
    }
    loadSingleTournament = async (id) => {
        const url = `api/tournaments/${id}`
        return await BaseApi.get(url);
    }
    loadTournamentsList = async () => {
        const url = "api/tournaments"
        return await BaseApi.get(url);
    }
    createTournament = async (params) => {
        const url = "api/tournaments"
        return await BaseApi.post(url, params);
    }
    updateTournament = async (params,id) => {
        const url = `api/tournaments/${id}`
        return await BaseApi.put(url, params);
    }
    deleteTournament =async (id) => {
        const url = `api/tournaments/${id}`
        return await BaseApi.delete(url);
    }
}

export default new TournamentsApi (BaseApi);