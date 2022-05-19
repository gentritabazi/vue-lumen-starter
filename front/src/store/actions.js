const displayLoader = (context, display) => {
  context.commit('DISPLAY_LOADER', display);
};

const loggedUser = (context, user) => {
  context.commit('LOGGED_USER', user);
};

const logOut = (context) => {
  context.commit('REMOVE_LOGGED_USER');
};

export default {
  displayLoader,
  loggedUser,
  logOut,
};
