import BaseApi from 'service/baseApi';

class CardApi {
    client;

    constructor(client) {
        this.client = client;
    }

    createCard = async (params) => {
        const url = "api/cards"
        return await BaseApi.post(url, params);
    }
    updateCard = async (params, id) => {
        const url = `api/cards/${id}`
        return await BaseApi.post(url, params);
    }
    deleteCard = async (id) => {
        const url = `api/cards/${id}`
        return await BaseApi.delete(url);
    }
}

export default new CardApi(BaseApi);