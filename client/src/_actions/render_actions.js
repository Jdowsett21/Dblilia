import { EDIT_BLOGS, EDIT_IMAGE, EDIT_PROFILE } from './types';

export function editProfile() {
  return {
    type: EDIT_PROFILE,
  };
}

export function editImagePopup() {
  return {
    type: EDIT_IMAGE,
  };
}

export function editBlogPopup() {
  return {
    type: EDIT_BLOGS,
  };
}
