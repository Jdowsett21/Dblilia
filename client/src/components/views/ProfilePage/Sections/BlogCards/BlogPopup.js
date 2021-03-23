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

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onClose = () => {
    setFileName('');
    dispatch(setCurrentBlog(''));
    dispatch(editBlogPopup());
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    if (title !== '' || file !== '') {
      const blog = {
        image: file,
        title: title,
      };
      addOrEdit
        ? dispatch(addBlog(blog))
        : dispatch(updateBlog(blog, currentBlog._id)) &&
          dispatch(deleteBlogImage(currentBlog.image));
      dispatch(editBlogPopup());
      setTimeout(() => {
        dispatch(getBlogs());
      }, 500);
    }

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
        <button className='popup__close' onClick={onClose}>
          &times;
        </button>
        <label className='image__label'>Upload Title</label>
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
