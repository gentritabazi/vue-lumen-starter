<template src="./Login.html"></template>
<script>
import httpAxios from '@/httpAxios.js';
import { useStore } from '@/store';

export default {
  name: 'LoginModule',

  setup() {
    return { store: useStore() };
  },

  metaInfo: function () {
    return {
      title: this.$t('auth.login'),
    };
  },

  data() {
    return {
      loginData: {
        email: null,
        password: null,
      },
      errors: {
        email: false,
        password: false,
      },
    };
  },

  methods: {
    login() {
      const self = this;

      // Clear Errors
      Object.keys(this.errors).forEach(function (key) {
        self.errors[key] = false;
      });

      // Ajax Request
      httpAxios({
        url: this.$backendUrl + '/login',
        method: 'POST',
        data: self.loginData,
      }).then((response) => {
        this.store.setLoggedUser(response.data);

        self.$router.push({ name: 'adminDashboard' });
      });
    },
  },
};
</script>
