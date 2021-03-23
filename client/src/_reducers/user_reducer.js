import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_USER,
  UPDATE_USER_IMAGE,
  DELETE_OLD_PROFILE,
} from '../_actions/types';

export default function (state = '', action) {
  switch (action.type) {
    // REGISTER NEW USER
    case REGISTER_USER:
      return { ...state, register: action.payload };

    // LOG IN USER
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    // AUTHENTICATE AND GET USER INFORMATION
    case AUTH_USER:
      return { ...state, userData: action.payload };

    // UPDATE USERS NAME, EMAIL OR LASTNAME
    case UPDATE_USER:
      return { ...state, updateInfoSuccess: action.payload };

    // UPLOAD NEW USER PROFILE IMAGE
    case UPDATE_USER_IMAGE:
      return { ...state, updateProfileImage: action.payload };

    // CLEANUP FUNCTION THAT REMOVES OLD PROFILE IMAGE FROM profileImages bucket
    // DOES NOT REMOVE INITAL PROFILE IMAGE FOR ALL USERS FROM defaultProfileImages bucket
    case DELETE_OLD_PROFILE:
      return { ...state, oldProfileDeleted: action.payload };

    // LOGOUT USER
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
