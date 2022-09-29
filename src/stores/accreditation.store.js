/* eslint-disable max-len */
import {makeAutoObservable, runInAction} from 'mobx';
import {notifier} from "utils/notifier";

import AccreditationApi from "service/AccreditationApi";
import TournamentsApi from "service/TournamentsApi";
import {RoleApi} from "service";
import {prepareFormDataRole} from "stores/role.store";

export default class AccreditationStore {

    accreditation = [];

    activeAccreditation = {};

    constructor(rootStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }
    loadSingleAccreditation = async (id) => {
        const response = await AccreditationApi.loadSingleAccreditation(id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            runInAction(() => {
                this.activeAccreditation = response.data.data
            })
        }
    }
    loadAccreditationList = async () => {
        const response = await AccreditationApi.loadAccreditationList();
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            this.accreditation = response.data.data
        }
    }
    createAccreditation = async (data) => {
        const response = await AccreditationApi.createAccreditation(data);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: "Аккредитация создана", type: 'success'});
            this.loadAccreditationList();
        }
    }
    updateAccreditation = async (data,id) => {
        const response = await AccreditationApi.updateAccreditation(data,id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: "Аккредитация обновлена", type: 'success'});
            this.loadAccreditationList();
        }
    }
    deleteAccreditation = async (id) => {
        const response = await AccreditationApi.deleteAccreditation(id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: `Аккредитация Id: ${id} удалена`, type: 'success'});
            await this.loadAccreditationList();
        }
    }
}
