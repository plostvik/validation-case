import { SET_USER_INFO } from './actions';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
