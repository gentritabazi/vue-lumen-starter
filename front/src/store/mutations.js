const DISPLAY_LOADER = (state, display) => {
  state.displayLoader = display;
};

const LOGGED_USER = (state, user) => {
  let now = new Date();
  let expiryDate = new Date();
  user.expiryDate = expiryDate.setTime(now.getTime() + user.expires_in * 1000);

  localStorage.setItem('loggedUser', JSON.stringify(user));
  state.loggedUser = JSON.stringify(user);
};

const REMOVE_LOGGED_USER = (state) => {
  state.loggedUser = null;
  localStorage.removeItem('loggedUser');
};

export default {
  DISPLAY_LOADER,
  LOGGED_USER,
  REMOVE_LOGGED_USER,
};
