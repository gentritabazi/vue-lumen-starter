// Import
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import i18n from './plugins/i18n'
import CripNotice from 'crip-vue-notice'
import authLayout from './views/layouts/auth'
import adminLayout from './views/layouts/admin'
import generalFunc from 'srcFolder/functions/general'
import VueMeta from 'vue-meta'
import store from './store'

// Register layouts
Vue.component('authLayout', authLayout);
Vue.component('adminLayout', adminLayout);

// General Config
Vue.config.productionTip = false
Vue.prototype.$backendUrl = process.env.VUE_APP_BACKEND_URL
Vue.prototype.$appName = process.env.VUE_APP_NAME
Vue.mixin(generalFunc)
Vue.use(CripNotice)
Vue.use(VueMeta)
if(store.getters.isLogged) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token
}
Vue.prototype.$http = axios

// Start Vue Js
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')