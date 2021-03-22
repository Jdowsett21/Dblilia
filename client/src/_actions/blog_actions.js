import axios from 'axios';
import {
  SET_TITLE,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  GET_BLOG,
} from './types';
import { BLOG_SERVER } from '../components/Config.js';
import FormData from 'form-data';

export function addBlog(image, title) {
  console.log(title);
  const formData = new FormData();
  formData.append('blogImage', image);
  formData.append('title', title);
  const request = axios
    .post(`${BLOG_SERVER}/createBlog`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => response.data);

  return {
    type: ADD_BLOG,
    payload: request,
  };
}

export function deleteBlog() {
  const request = axios
    .delete(`${BLOG_SERVER}/deleteBlog`)
    .then((response) => response.data);

  return {
    type: DELETE_BLOG,
    payload: request,
  };
}

export function getBlogs() {
  const request = axios
    .get(`${BLOG_SERVER}/getBlogs`)
    .then((response) => response.data);

  return {
    type: GET_BLOG,
    payload: request,
  };
}
export function setBlogTitle(title) {
  return {
    type: SET_TITLE,
    payload: title,
  };
}
export function updateBlog(values) {
  const formData = new FormData();
  formData.append('profileImage', values);

  const request = axios
    .patch(`${BLOG_SERVER}/uploadProfile`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => response.data);

  return {
    type: UPDATE_BLOG,
    payload: request,
  };
}
