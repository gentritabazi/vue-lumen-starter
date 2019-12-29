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
        if(store.state.isLogged) {
            next()
            return
        }
        return next('/login')
    }

    // Guest
    if(to.meta.guest) {
        if(store.state.isLogged) {
            return next('/admin/dashboard')            
        }
        next()
    }
    
    next()
})

export default router