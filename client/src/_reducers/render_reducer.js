import { EDIT_PROFILE, EDIT_IMAGE, EDIT_BLOGS } from '../_actions/types';

const initialState = {
  editProfile: false,
  editImage: false,
  editBlog: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case EDIT_PROFILE:
      return { ...state, editProfile: !state.editProfile };
    case EDIT_IMAGE:
      return { ...state, editImage: !state.editImage };
    case EDIT_BLOGS:
      return { ...state, editBlog: !state.editBlog };

    default:
      return state;
  }
}
