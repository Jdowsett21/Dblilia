import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_USER,
  UPDATE_USER_IMAGE,
} from './types';
import FormData from 'form-data';
import { fetch } from '../hoc/baseUrl';
export function registerUser(dataToSubmit) {
  const request = fetch
    .post(`/users/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = fetch
    .post(`/users/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = fetch.get(`/users/auth`).then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = fetch.get(`/users/logout`).then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function updateUser(dataToSubmit) {
  console.log(
    '🚀 ~ file: user_actions.js ~ line 58 ~ updateUser ~ dataToSubmit',
    dataToSubmit
  );
  const request = fetch
    .put(`/users/update`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: UPDATE_USER,
    payload: request,
  };
}

export function updateProfileImage(values) {
  const formData = new FormData();
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
