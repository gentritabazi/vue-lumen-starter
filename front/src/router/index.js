// Import
import Vue from 'vue'
import store from 'srcFolder/store'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

// Middleware
router.beforeEach((to, from, next) => {
    // Auth
    if(to.meta.auth) {
        if(store.getters.isLogged)
            return next()
        else
            return router.push({ name: 'login' })
    }

    // Guest
    if(to.meta.guest) {
        if(store.getters.isLogged)
            return router.push({ name: 'adminDashboard' })
        else
            return next()
    }
    
    next()
})

export default router