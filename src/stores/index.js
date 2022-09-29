import React from 'react';
import AuthStore from "stores/auth.store";
import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import ManagerStore from "stores/manager.store";
import RoleStore from "stores/role.store";
import AccreditationStore from "stores/accreditation.store";
import AppStore from "stores/app.store";
import TournamentsStore from "stores/tournaments.store";
import CardStore from "stores/card.store";




class RootStore {
  constructor() {
    this.router = routingStore;
    this.authStore = new AuthStore(this);
    this.managerStore = new ManagerStore(this)
    this.roleStore = new RoleStore(this)
    this.accreditationStore = new AccreditationStore(this)
    this.appStore = new AppStore(this)
    this.tournamentsStore = new TournamentsStore(this)
    this.cardStore = new CardStore(this)
  }
}
export const history = createBrowserHistory();

export const routingStore = new RouterStore();

export const browserHistory = syncHistoryWithStore(history, routingStore);
export const rootStore = new RootStore();
export const StoresContext = React.createContext(rootStore);

export const useStores = () => React.useContext(StoresContext);

export const useAuthStore = () => {
  const { authStore } = useStores();
  return authStore;
};


export const useManagerStore = () => {
  const { managerStore } = useStores();
  return managerStore;
};
export const useRoleStore = () => {
  const { roleStore } = useStores();
  return roleStore;
};
export const useAccreditationStore = () => {
  const { accreditationStore } = useStores();
  return accreditationStore;
};
export const useAppStore = () => {
  const { appStore } = useStores();
  return appStore;
};
export const useTournamentsStore = () => {
  const { tournamentsStore } = useStores();
  return tournamentsStore;
};
export const useCardStore = () => {
  const { cardStore } = useStores();
  return cardStore;
};