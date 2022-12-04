import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './locales';
import { createPinia } from 'pinia';
import notification from '@kyvg/vue3-notification';
import authLayout from '@/layouts/auth';
import adminLayout from '@/layouts/admin';

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.use(notification);
app.use(router);

// Register layouts
app.component('authLayout', authLayout);
app.component('adminLayout', adminLayout);

// Config
app.config.globalProperties.config = { productionTip: false };
app.config.globalProperties.$backendUrl = process.env.VUE_APP_BACKEND_URL;
app.config.globalProperties.$appName = process.env.VUE_APP_NAME;

app.mount('#app');
