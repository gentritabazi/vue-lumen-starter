// Import
import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

// Middlewares
router.beforeEach((to, from, next) => {
    // Redirect to route
    let redirectToRoute = function(name) {
		if (name === from.name) {
			next()
			return
        }
        
		next({ name: name })
    }
    
    // Get logged user
    let loggedUser = store.getters.getLoggedUser

    // Check if access token expired
	if (loggedUser) {
		let currentDateTime = new Date().getTime()
		if (currentDateTime > loggedUser.expiryDate) {
            store.dispatch('logOut')
            return redirectToRoute('login')
		}
	}

    // Auth
    if (to.meta.auth) {
        if (loggedUser)
            return next()
        else
            return redirectToRoute('login')
    }

    // Guest
    if (to.meta.guest) {
        if (loggedUser)
            return redirectToRoute('adminDashboard')
        else
            return next()
    }

    next()
})

export default router