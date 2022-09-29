/* eslint-disable max-len */
import {makeAutoObservable, runInAction} from 'mobx';
import {notifier} from "utils/notifier";
import ManagerApi from "service/ManagerApi";
import {RoleApi} from "service";

export default class RoleStore {

    roles = [];


    constructor(rootStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    loadRolesList = async () => {
        const response = await RoleApi.loadRolesList();
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            this.roles = response.data.data
        }
    }
    createRole = async (data) => {
        const params = prepareFormDataRole(data)
        const response = await RoleApi.createRole(params);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: "Роль создана", type: 'success'});
            this.loadRolesList();
        }
    }
    updateRole = async (data,id) => {
        const params = prepareFormDataRole(data)
        const response = await RoleApi.updateRole(params,id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: "Роль обновлена", type: 'success'});
            this.loadRolesList();
        }
    }
    deleteRole = async (id) => {
        const response = await RoleApi.deleteRole(id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: `Роль удалена`, type: 'success'});
            await this.loadRolesList();
        }
    }
    toggleSaveRole = async (value, id) => {
        const params = {
            favorite : value
        }
        const response = await RoleApi.toggleSaveRole(params,id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: `Роль добавлена в избранное`, type: 'success'});
            await this.loadRolesList();
        }
    }
}
export const prepareFormDataRole = (data) => {
    const convertToRGB = function (value) {
        let aRgbHex = value.match(/.{1,2}/g);
        let aRgb = [
            parseInt(aRgbHex[0], 16),
            parseInt(aRgbHex[1], 16),
            parseInt(aRgbHex[2], 16)
        ];
        return aRgb;
    }

    const params = {
        name: data.name,
        color: convertToRGB(data.color.slice(1)).toString(),
        zones: {...data.zones}
    }
    return params
}