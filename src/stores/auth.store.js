/* eslint-disable max-len */
import {makeAutoObservable, runInAction} from 'mobx';
import {AuthApi} from "service";
import {notifier} from "utils/notifier";

export default class AuthStore {

  isAuth = false;
  token = null;
  user = {}
  isChecking = true;
  constructor(rootStore) {
    makeAutoObservable(this, {rootStore: false});
    this.rootStore = rootStore;
  }
  rememberMe = (token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('isAuth', "true")
  }
  login = async (data) => {
    const response = await AuthApi.login(data)
    if (response.isError) {
      notifier({ description: response.message, type: 'error' });
    } else {
      if(data.remember) {
        this.rememberMe(response.data)
      }
      await this.getUserInfo()
      runInAction(() => {
        this.token = response.data
        this.isAuth = true;
      })
    }
  };
  checkAuth = async () => {
    this.isChecking = true;
    const auth = localStorage.getItem('isAuth')
    if(auth) {
      await this.getUserInfo()
      runInAction(() => {
        this.isAuth = true;
        this.token = localStorage.getItem('token')
      })
      return true;
    }
    this.isChecking = false;
    return false;
  }
  getUserInfo = async () => {
    const response = await AuthApi.getUserInfo()
    if (response.isError) {
      notifier({ description: response.message, type: 'error' });
    } else {
      runInAction(() => {
          this.user = response.data
      })
    }
  }
  logout = () => {
    localStorage.removeItem('isAuth')
    localStorage.removeItem('token')
    runInAction(() => {
      this.token = null;
      this.isAuth = false;
    })

  }
}
