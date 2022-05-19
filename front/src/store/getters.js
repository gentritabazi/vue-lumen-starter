const getDisplayLoader = (state) => {
  return state.displayLoader;
};

const getLoggedUser = (state) => {
  let user = state.loggedUser;
  if (user) {
    user = JSON.parse(user);
  }
  return user;
};

export default {
  getDisplayLoader,
  getLoggedUser,
};
