import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import renderReducer from './render_reducer';
import blogReducer from './blog_reducer';
const rootReducer = combineReducers({
  user: userReducer,
  render: renderReducer,
  blog: blogReducer,
});

export default rootReducer;
