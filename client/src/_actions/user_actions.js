import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_USER,
  UPDATE_USER_IMAGE,
  DELETE_OLD_PROFILE,
} from './types';
import FormData from 'form-data';
import { fetch } from '../hoc/baseUrl';

// REGISTER NEW USER
export function registerUser(dataToSubmit) {
  const request = fetch
    .post(`/users/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

// LOG IN USER
export function loginUser(dataToSubmit) {
  const request = fetch
    .post(`/users/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

// AUTHENTICATE AND GET USER INFORMATION
export function auth() {
  const request = fetch.get(`/users/auth`).then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
// LOGOUT USER
export function logoutUser() {
  const request = fetch.get(`/users/logout`).then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function updateUser(dataToSubmit) {
  const request = fetch
    .put(`/users/update`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: UPDATE_USER,
    payload: request,
  };
}

//// CLEANUP FUNCTION THAT REMOVES OLD PROFILE IMAGE FROM profileImages bucket
// DOES NOT REMOVE INITAL PROFILE IMAGE FOR ALL USERS FROM defaultProfileImages bucket
export function deleteOldProfile() {
  const request = fetch
    .delete(`/users/oldProfile`)
    .then((response) => response.data);

  return {
    type: DELETE_OLD_PROFILE,
    payload: request,
  };
}

// UPLOAD NEW USER PROFILE IMAGE
export function updateProfileImage(values) {
  const formData = new FormData();

  // PROFILE IMAGE IS IN FORM DATA FROM HTML FORM
  formData.append('profileImage', values);

  const request = fetch
    .patch(`/users/uploadProfile`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => response.data);

  return {
    type: UPDATE_USER_IMAGE,
    payload: request,
  };
}
