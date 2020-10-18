// Import
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import VueMeta from 'vue-meta'
import store from './store'
import Notifications from 'vue-notification'

// Register layouts
const authLayout = () => import('./layouts/auth')
const adminLayout = () => import('./layouts/admin')
Vue.component('authLayout', authLayout)
Vue.component('adminLayout', adminLayout)

// Config
Vue.config.productionTip = false
Vue.prototype.$backendUrl = process.env.VUE_APP_BACKEND_URL
Vue.prototype.$appName = process.env.VUE_APP_NAME
Vue.use(Notifications)
Vue.use(VueMeta)

// Start Vue Js
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')