import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_USER,
  UPDATE_USER_IMAGE,
} from '../_actions/types';

export default function (state = '', action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case UPDATE_USER:
      return { ...state, updateInfoSuccess: action.payload };
    case UPDATE_USER_IMAGE:
      return { ...state, updateProfileImage: action.payload };

    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
