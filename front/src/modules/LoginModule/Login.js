import httpAxios from '@/httpAxios.js';

export default {
  name: 'LoginModule',

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
        self.$store.commit('LOGGED_USER', response.data);

        self.$router.push({ name: 'adminDashboard' });
      });
    },
  },
};
