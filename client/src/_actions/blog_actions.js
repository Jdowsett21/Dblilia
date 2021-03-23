import {
  SET_CURRENT_BLOG,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  GET_BLOG,
  ADD_OR_EDIT_BLOG,
  DELETE_BLOG_IMAGE,
} from './types';
import FormData from 'form-data';
import { fetch } from '../hoc/baseUrl';

export function addBlog(blog) {
  console.log(fetch);
  const formData = new FormData();
  formData.append('blogImage', blog.image);
  formData.append('title', blog.title);

  const request = fetch
    .post(`/blog/createBlog`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => response.data);

  return {
    type: ADD_BLOG,
    payload: request,
  };
}

export function deleteBlog(blog) {
  const request = fetch
    .delete(`/blog/deleteBlog/${blog._id}`)
    .then((response) => response.data);

  return {
    type: DELETE_BLOG,
    payload: request,
  };
}

export function deleteBlogImage(image) {
  const request = fetch
    .delete(`/blog/deleteBlogImage/${image}`)
    .then((response) => response.data);

  return {
    type: DELETE_BLOG_IMAGE,
    payload: request,
  };
}
export function getBlogs() {
  const request = fetch.get(`/blog/getBlogs`).then((response) => response.data);

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

  const request = fetch
    .patch(`/blog/updateBlog/${blogId}`, formData, {
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
