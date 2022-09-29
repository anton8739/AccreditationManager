/* eslint-disable max-len */
import {makeAutoObservable, runInAction} from 'mobx';
import {notifier} from "utils/notifier";
import TournamentsApi from "service/TournamentsApi";
import {RoleApi} from "service";
import ManagerApi from "service/ManagerApi";
import BaseApi from "service/baseApi";
import {prepareFormData} from "stores/manager.store";

export default class TournamentsStore {

    tournaments = [];

    activeTournament = {}

    constructor(rootStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }
    loadSingleTournament = async (id) => {
        const response = await TournamentsApi.loadSingleTournament(id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            runInAction(() => {
                this.activeTournament = response.data.data
            })
        }
    }
    loadTournamentsList = async () => {
        const response = await TournamentsApi.loadTournamentsList();
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            this.tournaments = response.data.data
        }
    }
    createTournament = async (data) => {
        const params =prepareTournamentData(data)
        const response = await TournamentsApi.createTournament(params);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: "Турнир успешно создан", type: 'success'});
            await this.loadTournamentsList();
        }
    }
    deleteTournament = async (id) => {
        const response = await TournamentsApi.deleteTournament(id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: `Турнир удален`, type: 'success'});
            await this.loadTournamentsList();
        }
    }
    updateTournament = async (data,id) => {
        const params = prepareTournamentData(data)
        const response = await TournamentsApi.updateTournament(params,id);
        if (response.isError) {
            notifier({ description: response.message, type: 'error' });
        } else {
            notifier({description: "Турнир обновлен обновлен", type: 'success'});
            await this.loadTournamentsList();
        }
    }
    setActiveTournament = (value) => {
        runInAction(() => {
            this.activeTournament = value
        })
    }
}
export const prepareTournamentData = (data) => {
    const params = {
        "name": data.name,
        "start_date": new Date(data.date[0]).toISOString(),
        "end_date": new Date(data.date[1]).toISOString(),
    }
    return params
}