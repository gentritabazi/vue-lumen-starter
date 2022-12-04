import { defineStore } from 'pinia';

import getters from './getters';

const getState = () => {
  return {
    displayLoader: false,
    loggedUser: localStorage.getItem('loggedUser') || null,
  };
};

export const useStore = defineStore('main', {
  state: getState,
  getters: getters,
  actions: {
    setDisplayLoader(displayLoader) {
      this.displayLoader = displayLoader;
    },
    setLoggedUser(user) {
      let now = new Date();
      let expiryDate = new Date();
      user.expiryDate = expiryDate.setTime(now.getTime() + user.expires_in * 1000);

      localStorage.setItem('loggedUser', JSON.stringify(user));
      this.loggedUser = JSON.stringify(user);
    },
    logOut() {
      this.loggedUser = null;
      localStorage.removeItem('loggedUser');
    },
  },
});
