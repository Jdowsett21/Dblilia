import {
  ADD_BLOG,
  GET_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  SET_TITLE,
} from '../_actions/types';

const initialState = {
  blogList: [],
  title: '',
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_BLOG:
      return { ...state, blogs: action.payload };

    case UPDATE_BLOG:
      return {
        ...state,
        title: action.payload.title,
      };
    case GET_BLOG:
      return {
        ...state,
        blogList: action.payload,
      };

    case DELETE_BLOG:
      return { ...state, blogs: action.payload };
    case SET_TITLE:
      return { ...state, title: action.payload };

    default:
      return state;
  }
}
