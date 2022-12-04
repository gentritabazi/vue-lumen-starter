// Import
import { useStore } from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes,
});

// Middlewares
router.beforeEach((to, from, next) => {
  const store = useStore();

  // Redirect to route
  let redirectToRoute = function (name) {
    if (name === from.name) {
      next();
      return;
    }

    next({ name: name });
  };

  // Get logged user
  let loggedUser = store.getLoggedUser;

  // Check if access token expired
  if (loggedUser) {
    let currentDateTime = new Date().getTime();
    if (currentDateTime > loggedUser.expiryDate) {
      store.logOut();
      return redirectToRoute('login');
    }
  }

  // Auth
  if (to.meta.auth) {
    if (loggedUser) return next();
    else return redirectToRoute('login');
  }

  // Guest
  if (to.meta.guest) {
    if (loggedUser) return redirectToRoute('adminDashboard');
    else return next();
  }

  next();
});

export default router;
