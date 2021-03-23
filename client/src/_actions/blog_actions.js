import {
  SET_CURRENT_BLOG,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  GET_BLOGS,
  ADD_OR_EDIT_BLOG,
  DELETE_BLOG_IMAGE,
} from './types';
import FormData from 'form-data';
import { fetch } from '../hoc/baseUrl';

// ADD BLOG TO USER PROFILE
export function addBlog(blog) {
  // ATTACHING FORM DATA FROM HTML FORM
  const formData = new FormData();
  formData.append('blogImage', blog.image);
  formData.append('title', blog.title);

  const request = fetch
    .post(`/blog/createBlog`, formData, {
      // NECCESARY HEADER TO SEND FORM DATA TO BACKEND
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => response.data);

  return {
    type: ADD_BLOG,
    payload: request,
  };
}

// DELETE SINGLE BLOG
export function deleteBlog(blog) {
  // BLOG IS DELETED BY ID
  const request = fetch
    .delete(`/blog/deleteBlog/${blog._id}`)
    .then((response) => response.data);

  return {
    type: DELETE_BLOG,
    payload: request,
  };
}

// CLEANUP FUNCTION DELETING OLD BLOGS IMAGE
// OR EDITED BLOGS OLD IMAGE FROM BLOGIMAGES BUCKET
export function deleteBlogImage(image) {
  const request = fetch
    .delete(`/blog/deleteBlogImage/${image}`)
    .then((response) => response.data);

  return {
    type: DELETE_BLOG_IMAGE,
    payload: request,
  };
}
// GETS ALL BLOGS FOR USER
export function getBlogs() {
  const request = fetch.get(`/blog/getBlogs`).then((response) => response.data);

  return {
    type: GET_BLOGS,
    payload: request,
  };
}
// SETS CURRENT BLOG TO STATE  WHEN EDIT, DELETE OR VIEW BUTTON IS CLICKED
export function setCurrentBlog(blog) {
  return {
    type: SET_CURRENT_BLOG,
    payload: blog,
  };
}

// UPDATES A BLOG ITEM UPON EDIT BUTTON
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

// TOGGLES BOOLEAN addOrEdit IN BLOGPOPUP COMPONENT TO SET THE COMPONENT
// TO ADD A NEW BLOG IF TRUE OR EDIT THE SELECTED BLOG IF FALSE
// PREVENTS CREATION OF SEPARTE BLOG POPUP EDIT AND BLOGPOPUP ADD
export function setAddOrEdit(value) {
  return {
    type: ADD_OR_EDIT_BLOG,
    payload: value,
  };
}
