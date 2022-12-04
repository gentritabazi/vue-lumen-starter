<template src="./Register.html"></template>
<script>
import httpAxios from '@/httpAxios.js';

export default {
  name: 'RegisterModule',

  metaInfo: function () {
    return {
      title: this.$t('auth.register'),
    };
  },

  data() {
    return {
      registerData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      },
      errors: {
        first_name: false,
        last_name: false,
        email: false,
        password: false,
      },
    };
  },

  methods: {
    register() {
      const self = this;

      // Clear Errors
      Object.keys(self.errors).forEach(function (key) {
        self.errors[key] = false;
      });

      // Ajax Request
      httpAxios({
        url: this.$backendUrl + '/register',
        method: 'POST',
        data: self.registerData,
      }).then(() => {
        Object.keys(self.registerData).forEach(function (key) {
          self.registerData[key] = '';
        });

        self.$notify({
          group: 'notify',
          type: 'success',
          title: self.$t('general.success'),
          text: 'The process was successfully completed',
        });

        setTimeout(() => self.$router.push({ name: 'login' }), 3000);
      });
    },
  },
};
</script>
