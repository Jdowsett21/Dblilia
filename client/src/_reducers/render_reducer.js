import { EDIT_PROFILE, EDIT_IMAGE, EDIT_BLOGS } from '../_actions/types';

const initialState = {
  editProfile: false,
  editImage: false,
  editBlog: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    // BOOLEAN THAT SETS EDIT PROFILE CARD TO SHOW INFO OR SHOW
    // FIELDS TO EDIT INFO IF TRUE
    case EDIT_PROFILE:
      return { ...state, editProfile: !state.editProfile };

    // BOOLEAN THAT TOGGLES THE POPUP WINDOW TO EDIT PROFILE IMAGE IF TRUE
    case EDIT_IMAGE:
      return { ...state, editImage: !state.editImage };

    // BOOLEAN THAT TOGGLES THE POPUP WINDOW TO EDIT/ADD BLOG IF TRUE
    // WHETHER POPUP WILL ADD OR EDIT IS BASED ON addOrEdit BOOLEAN IN THE BLOG REDUCER/ACTIONS -ADD_OR_EDIT_BLOG
    case EDIT_BLOGS:
      return { ...state, editBlog: !state.editBlog };

    default:
      return state;
  }
}
