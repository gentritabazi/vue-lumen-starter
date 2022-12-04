// Import
import axios from 'axios';
import { useStore } from '@/store';
import { notify } from '@kyvg/vue3-notification';

// Create
const service = axios.create({
  baseURL: '',
});

// Request Interceptor
service.interceptors.request.use(
  (config) => {
    const store = useStore();
    store.setDisplayLoader(true);

    // Token
    if (store.getLoggedUser) {
      config.headers.common['Authorization'] = 'Bearer ' + store.getLoggedUser.access_token;
    }

    return config;
  },
  (error) => {
    const store = useStore();
    store.setDisplayLoader(false);

    return Promise.reject(error);
  },
);

// Response Interceptor
service.interceptors.response.use(
  (response) => {
    const store = useStore();
    store.setDisplayLoader(false);

    return response;
  },
  (error) => {
    const store = useStore();
    store.setDisplayLoader(false);

    var errors = error;

    if (error.response) {
      // Session Expired
      if (401 === error.response.status) {
        errors = error.response.data.message;
        store.logOut();
      }

      // Errors from backend
      if (error.response.status == 422) {
        errors = '';

        for (var errorKey in error.response.data.errors) {
          for (var i = 0; i < error.response.data.errors[errorKey].length; i++) {
            errors += String(error.response.data.errors[errorKey][i]) + '<br>';
          }
        }
      }

      // Backend error
      if (500 === error.response.status) {
        errors = error.response.data.message;
      }

      // 404
      if (error.response.status == 404) {
        errors = 'Page not found';
      }
    }

    notify({
      group: 'notify',
      type: 'error',
      title: 'Error',
      text: String(errors),
    });

    return Promise.reject(error);
  },
);

// Export axios
export default service;
