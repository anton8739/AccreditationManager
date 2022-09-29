/* eslint-disable max-len */
import {makeAutoObservable, runInAction} from 'mobx';
import {AuthApi} from "service";
import {notifier} from "utils/notifier";
import ManagerApi from "service/ManagerApi";
import AccreditationApi from "service/AccreditationApi";

export default class ManagerStore {

    managerAccessList = [];


    constructor(rootStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }
    loadManagerAccessList = async () => {
        const response = await ManagerApi.loadManagerAccessList();
        if (response.isError) {
            notifier({ description: response.message, type: 'error' });
        } else {
            this.managerAccessList = response.data.data
        }
    }
    createManagerAccess = async (data) => {
        const params = prepareFormData(data)
        const response = await ManagerApi.createManagerAccess(params);
        if (response.isError) {
            notifier({ description: response.message, type: 'error' });
        } else {
            notifier({description: "Доступ менеджера создан", type: 'success'});
            this.loadManagerAccessList()
        }
    }
    updateManagerAccess = async (data,id) => {
        const params = prepareFormData(data)
        const response = await ManagerApi.updateManagerAccess(params,id);
        if (response.isError) {
            notifier({ description: response.message, type: 'error' });
        } else {
            notifier({description: "Доступ менеджера обновлен", type: 'success'});
            this.loadManagerAccessList()
        }
    }
    deleteManager = async (id) => {
        const response = await ManagerApi.deleteManager(id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: `Доступ менеджера удален`, type: 'success'});
            await this.loadManagerAccessList();
        }
    }
}

export const prepareFormData = (data) => {
    const params = {
        "name": data.username,
        "email": data.email,
        "access_end": new Date(data.date).toISOString(),
        "password": data.password

    }
    return params
}