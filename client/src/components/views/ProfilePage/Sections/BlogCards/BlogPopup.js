import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import {
  setBlogTitle,
  getBlogs,
  updateBlog,
  addBlog,
} from '../../../../../_actions/blog_actions';
import { editBlogPopup } from '../../../../../_actions/render_actions';

function BlogPopup({ blog: { title }, addOrEdit }) {
  const dispatch = useDispatch();
  const [file, setFileName] = useState('');

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const onChangeTitle = (e) => {
    dispatch(setBlogTitle(e.target.value));
  };

  const onClose = () => {
    setFileName('');
    dispatch(setBlogTitle(''));
    dispatch(editBlogPopup());
  };
  const changeOnClick = (e) => {
    e.preventDefault();

    if (file !== '') {
      addOrEdit
        ? dispatch(addBlog(file, title))
        : dispatch(updateBlog(file, title));
      dispatch(editBlogPopup());
      dispatch(getBlogs());
    }
    e.target.value = null;
    setFileName('');
    setBlogTitle('');
  };
  return (
    <>
      <form
        className='image__form'
        onSubmit={changeOnClick}
        encType='multipart/form-data'
      >
        <button className='popup__close' onClick={onClose}>
          &times;
        </button>
        <label htmlFor className='image__label'>
          Upload Title
        </label>
        <input
          type='input'
          placeholder={title}
          value={title}
          className='text__input'
          onChange={onChangeTitle}
        />
        <label htmlFor='file' className='image__label'>
          Upload Profile Image
        </label>
        <input
          type='file'
          accept='image/x-png,image/gif,image/jpeg'
          filename='blogImage'
          className='image__input'
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
