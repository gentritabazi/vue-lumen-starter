// Import Modules
import error404Module from '@/modules/Error404Module'
import loginModule from '@/modules/LoginModule'
import registerModule from '@/modules/RegisterModule'
import dashboardModule from '@/modules/DashboardModule'

export default [
    // Home Page
    { path: '/', redirect: '/login' },

    // Errors
    { path: '*',  component: error404Module },

    // Auth
    { path: '/login', name: 'login', component: loginModule, meta: { guest: true } },
    { path: '/register', name: 'register', component: registerModule, meta: { guest: true } },

    // Admin
    { path: '/admin/dashboard', name: 'adminDashboard', component: dashboardModule, meta: { auth: true } },
]