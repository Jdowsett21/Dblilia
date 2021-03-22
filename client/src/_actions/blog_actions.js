import axios from 'axios';
import {
  SET_CURRENT_BLOG,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  GET_BLOG,
  ADD_OR_EDIT_BLOG,
} from './types';
import { BLOG_SERVER } from '../components/Config.js';
import FormData from 'form-data';

export function addBlog(blog) {
  const formData = new FormData();
  formData.append('blogImage', blog.image);
  formData.append('title', blog.title);

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

export function deleteBlog(blog) {
  const request = axios
    .delete(`${BLOG_SERVER}/deleteBlog/${blog._id}`)
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
export function setCurrentBlog(blog) {
  return {
    type: SET_CURRENT_BLOG,
    payload: blog,
  };
}
export function updateBlog(blog, blogId) {
  const formData = new FormData();
  formData.append('blogImage', blog.image);
  formData.append('title', blog.title);

  const request = axios
    .patch(`${BLOG_SERVER}/updateBlog/${blogId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => response.data);

  return {
    type: UPDATE_BLOG,
    payload: request,
  };
}

export function setAddOrEdit(value) {
  return {
    type: ADD_OR_EDIT_BLOG,
    payload: value,
  };
}
