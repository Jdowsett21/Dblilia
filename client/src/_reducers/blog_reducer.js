import {
  ADD_BLOG,
  GET_BLOGS,
  UPDATE_BLOG,
  DELETE_BLOG,
  DELETE_BLOG_IMAGE,
  ADD_OR_EDIT_BLOG,
  SET_CURRENT_BLOG,
} from '../_actions/types';

const initialState = {
  blogList: [],
  currentBlog: '',
  addOrEdit: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    // ADDS A NEW BLOG TO USERS BLOG CARDS
    case ADD_BLOG:
      return { ...state, addSuccess: action.payload };

    // UPDATES A PREVIOUSLY CREATED BLOG
    case UPDATE_BLOG:
      return {
        ...state,
        updateSuccess: action.payload,
      };
    // GETS ALL BLOGS FOR USERS
    case GET_BLOGS:
      return {
        ...state,
        blogList: action.payload,
      };

    // TOGGLES BOOLEAN addOrEdit IN blogPopup COMPONENT TO SET THE COMPONENT
    // TO ADD A NEW BLOG IF TRUE OR EDIT THE SELECTED BLOG IF FALSE
    // PREVENTS CREATION OF SEPARTE BLOG POPUP EDIT AND blogPopup ADD
    case ADD_OR_EDIT_BLOG:
      return { ...state, addOrEdit: action.payload };

    // DELETES SELECTED BLOG BY ID
    case DELETE_BLOG:
      return { ...state, deleteSuccess: action.payload };

    // CLEANUP ACTION DELETING OLD BLOGS IMAGE
    // OR EDITED BLOGS OLD IMAGE FROM BLOGIMAGES BUCKET
    case DELETE_BLOG_IMAGE:
      return { ...state, deleteImageSuccess: action.payload };

    // SETS CURRENT BLOG TO STATE  WHEN EDIT, DELETE OR VIEW BUTTON IS CLICKED
    case SET_CURRENT_BLOG:
      return { ...state, currentBlog: action.payload };

    default:
      return state;
  }
}
