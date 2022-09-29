/* eslint-disable max-len */
import {makeAutoObservable, runInAction} from 'mobx';
import {notifier} from "utils/notifier";
import AppApi from "service/AppApi";


export default class AppStore {

    currentPageTitle = "Главная"

    accounts = 0;
    contacts = 5;
    currentTournament = null;
    players = 0;
    withoutAccreditation = 0;
    roles = {}


    constructor(rootStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    loadStatistics = async () => {
        const response = await AppApi.loadStatistics()
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            runInAction(() => {
                this.accounts = response.data.accounts;
                this.contacts = response.data.contacts
                this.currentTournament = response.data.current_tournament
                this.players = response.data.players
                this.withoutAccreditation = response.data.without_accreditation
                this.roles = response.data.roles
            })
        }
    }
    setCurrentPageTitle = (value) => {
        runInAction(() => {
            this.currentPageTitle = value
        })
    }
}
