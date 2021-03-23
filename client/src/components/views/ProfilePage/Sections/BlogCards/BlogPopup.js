import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import {
  getBlogs,
  updateBlog,
  addBlog,
  setCurrentBlog,
  deleteBlogImage,
} from '../../../../../_actions/blog_actions';
import { editBlogPopup } from '../../../../../_actions/render_actions';

function BlogPopup({ blog: { currentBlog, addOrEdit } }) {
  const dispatch = useDispatch();
  const [file, setFileName] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(currentBlog === '' ? '' : currentBlog.title);
  }, [currentBlog]);
  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  // SETS TITLE STATE UPON INPUT CHANGE OF TITLE FIELD
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  // RESETS FORM INFO IF FILE IS CLOSED
  const onClose = () => {
    setFileName('');
    dispatch(setCurrentBlog(''));
    dispatch(editBlogPopup());
  };

  // ON SUBMIT FORM FUNCTION
  const changeOnClick = (e) => {
    // PREVENT PAGE RELOAD
    e.preventDefault();

    // FORM DOESNT SUBMIT IF TITLE AND FILE ARENT ADDED
    if (title !== '' || file !== '') {
      const blog = {
        image: file,
        title: title,
      };
      // EITHER ADDS OR EDITS BLOG BASED ON addOrEdit
      // PREVIOUS TOGGLED BY ADD BLOG OR EDIT  BLOG
      addOrEdit
        ? dispatch(addBlog(blog))
        : dispatch(updateBlog(blog, currentBlog._id)) &&
          // IF EDIT BLOG, ALSO DELETES OLD BLOG IMAGE FROM BLOGIMAGES BUCKET
          dispatch(deleteBlogImage(currentBlog.image));

      // BLOG POPUP IS CLOSED
      dispatch(editBlogPopup());

      // RERENDERS BLOGLIST AFTER SMALL TIMEOUT
      setTimeout(() => {
        dispatch(getBlogs());
      }, 500);
    }
    // RESETS FORM VALUES AND STATE VALUES
    e.target.value = null;
    setFileName('');
    setTitle('');
    setCurrentBlog('');
  };

  return (
    <>
      <form
        className='image__form'
        onSubmit={changeOnClick}
        encType='multipart/form-data'
      >
        {/* CLOSES POPUP */}
        <button className='popup__close' onClick={onClose}>
          &times;
        </button>
        <label className='image__label'>Upload Title</label>
        <input
          type='input'
          placeholder={title}
          value={title}
          className='text__input'
          // CHANGES TITLE STATE
          onChange={onChangeTitle}
        />
        <label htmlFor='file' className='image__label'>
          Upload Profile Image
        </label>
        <input
          type='file'
          accept='image/png,image/jpeg'
          filename='blogImage'
          className='image__input'
          // CHANGES FILE STATE
          onChange={onChangeFile}
        />
        <button type='submit' className='image__button'>
          Submit
        </button>
      </form>
    </>
  );
}
const mapStatetoProps = (state) => ({
  blog: state.blog,
});
export default connect(mapStatetoProps)(BlogPopup);
