/* eslint-disable max-len */
import {makeAutoObservable, runInAction} from 'mobx';
import {notifier} from "utils/notifier";

import {CardApi, RoleApi} from "service";
import TournamentsApi from "service/TournamentsApi";
import {prepareFormDataRole} from "stores/role.store";


export default class CardStore {

    cards = []

    constructor(rootStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    createCard = async (data) => {

        const response = await CardApi.createCard(data);
        if (response.isError) {
            notifier({ description: response.message, type: 'error' });
        } else {
            notifier({description: "Карточка успешно создана", type: 'success'});
            this.rootStore.tournamentsStore.loadSingleTournament(this.rootStore.tournamentsStore.activeTournament.id)
        }
    }
    updateCard = async (data,id) => {
        const response = await CardApi.updateCard(data,id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: "Карточка обновлена обновлена", type: 'success'});
            this.rootStore.tournamentsStore.loadSingleTournament(this.rootStore.tournamentsStore.activeTournament.id)
        }
    }
    deleteCard = async (id) => {
        const response = await CardApi.deleteCard(id);
        if (response.isError) {
            notifier({description: response.message, type: 'error'});
        } else {
            notifier({description: `Карточка успешно удалена`, type: 'success'});
            this.rootStore.tournamentsStore.loadSingleTournament(this.rootStore.tournamentsStore.activeTournament.id)
        }
    }
}
