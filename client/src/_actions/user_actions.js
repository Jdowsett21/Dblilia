import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_USER,
  UPDATE_USER_IMAGE,
} from './types';
import { USER_SERVER } from '../components/Config.js';
import FormData from 'form-data';

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

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
  const request = axios
    .put(`${USER_SERVER}/update`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: UPDATE_USER,
    payload: request,
  };
}

export function updateProfileImage(values) {
  const formData = new FormData();
  formData.append('profileImage', values);

  const request = axios
    .patch(`${USER_SERVER}/uploadProfile`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => response.data);

  return {
    type: UPDATE_USER_IMAGE,
    payload: request,
  };
}
