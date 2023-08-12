export const SET_USER_INFO = 'SET_USER_INFO';

export const setUserInfo = (firstName, lastName, email, message) => ({
  type: SET_USER_INFO,
  payload: { firstName, lastName, email, message },
});
