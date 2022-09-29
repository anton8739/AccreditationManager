import axios from 'axios';
import { rootStore } from 'stores';
const client = axios.create({
    withCredentials: true,
    baseURL: `${window.location.origin}/`,
});
client.interceptors.request.use((config) => {
    config.headers.accept = `application/json`;
    if (localStorage.getItem('isAuth')) {
        console.log(`check auth`)
        config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
});
class BaseApi {
    http;
    constructor(client) {
        this.http = client;
    }

    get = async (url) => {
        try {
            return await this.http.get(url);
        } catch (e) {
            return { isError: true, message: e.message, shownMessage: e.response?.data?.message };
        }
    };
    post = async (url, data, config) => {
        try {
            return await this.http.post(url, data, config);
        } catch (e) {
            console.error(e.message);
            return { isError: true, message: e.message, shownMessage: e.response?.data?.message };
        }
    };

    put = async (url, params) => {
        try {
            return await this.http.put(url, params);
        } catch (e) {
            console.error(e.message);
            return { isError: true, message: e.message, shownMessage: e.response?.data?.message };
        }
    };

    delete = async (url) => {
        try {
            return await this.http.delete(url);
        } catch (e) {
            console.error(e.message);
            return { isError: true, message: e.message, shownMessage: e.response?.data?.message };
        }
    };

    patch = async (url, data, config) => {
        try {
            return await this.http.patch(url, data, config);
        } catch (e) {
            console.error(e.message);
            return { isError: true, message: e.message, shownMessage: e.response?.data?.message };
        }
    };
}

export default new BaseApi(client);
