/////////// USER ACTIONS /////////

// LOG IN USER
export const LOGIN_USER = 'login_user';

// REGISTER NEW USER
export const REGISTER_USER = 'register_user';

// AUTHENTICATE AND GET USER INFORMATION
export const AUTH_USER = 'auth_user';

// LOGOUT USER
export const LOGOUT_USER = 'logout_user';

// UPDATE USERS NAME, EMAIL OR LASTNAME
export const UPDATE_USER = 'update_user';

// UPLOAD NEW USER PROFILE IMAGE
export const UPDATE_USER_IMAGE = 'update_user_image';

// CLEANUP FUNCTION THAT REMOVES OLD PROFILE IMAGE FROM profileImages bucket
// DOES NOT REMOVE INITAL PROFILE IMAGE FOR ALL USERS FROM defaultProfileImages bucket
export const DELETE_OLD_PROFILE = 'delete_old_profile';

/////////// RENDER ACTIONS /////////

// BOOLEAN THAT SETS EDIT PROFILE CARD TO SHOW INFO OR SHOW
// FIELDS TO EDIT INFO IF TRUE
export const EDIT_PROFILE = 'edit_profile';

// BOOLEAN THAT TOGGLES THE POPUP WINDOW TO EDIT PROFILE IMAGE IF TRUE
export const EDIT_IMAGE = 'edit_image';

// BOOLEAN THAT TOGGLES THE POPUP WINDOW TO EDIT/ADD BLOG IF TRUE
// WHETHER POPUP WILL ADD OR EDIT IS BASED ON addOrEdit BOOLEAN IN THE BLOG REDUCER/ACTIONS -ADD_OR_EDIT_BLOG
export const EDIT_BLOGS = 'edit_blogs';

///////// BLOG ACTIONS ///////

// ADDS A NEW BLOG TO USERS BLOG CARDS
export const ADD_BLOG = 'add_blog';

// UPDATES A PREVIOUSLY CREATED BLOG
export const UPDATE_BLOG = 'update_blog';

// GETS ALL BLOGS FOR USERS
export const GET_BLOGS = 'get_blogS';

// DELETES SELECTED BLOG BY ID
export const DELETE_BLOG = 'delete_blog';

// CLEANUP ACTION DELETING OLD BLOGS IMAGE
// OR EDITED BLOGS OLD IMAGE FROM BLOGIMAGES BUCKET
export const DELETE_BLOG_IMAGE = 'delete_blog_image';

// SETS CURRENT BLOG TO STATE  WHEN EDIT, DELETE OR VIEW BUTTON IS CLICKED
export const SET_CURRENT_BLOG = 'set_current_blog';

// TOGGLES BOOLEAN addOrEdit IN blogPopup COMPONENT TO SET THE COMPONENT
// TO ADD A NEW BLOG IF TRUE OR EDIT THE SELECTED BLOG IF FALSE
// PREVENTS CREATION OF SEPARTE BLOG POPUP EDIT AND blogPopup ADD
export const ADD_OR_EDIT_BLOG = 'add_or_edit_blog';
