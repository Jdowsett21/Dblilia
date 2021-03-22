import {
  ADD_BLOG,
  GET_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
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
    case ADD_BLOG:
      return { ...state, addSuccess: action.payload };

    case UPDATE_BLOG:
      return {
        ...state,
        updateSuccess: action.payload,
      };
    case GET_BLOG:
      return {
        ...state,
        blogList: action.payload,
      };

    // true blog popup creates new blog, false blog popup edits selected blog
    case ADD_OR_EDIT_BLOG:
      return { ...state, addOrEdit: action.payload };

    case DELETE_BLOG:
      return { ...state, deleteSuccess: action.payload };
    case SET_CURRENT_BLOG:
      return { ...state, currentBlog: action.payload };

    default:
      return state;
  }
}
