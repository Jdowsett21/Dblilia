import React, { useEffect, useState } from 'react';
import { editBlogPopup } from '../../../../../_actions/render_actions';
import { useDispatch } from 'react-redux';
import {
  deleteBlog,
  deleteBlogImage,
  setAddOrEdit,
  setCurrentBlog,
  getBlogs,
} from '../../../../../_actions/blog_actions';
import { Link } from 'react-router-dom';
import sprite from '../../../../../img/sprite.svg';
function BlogItem({ blog }) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const dispatch = useDispatch();

  // SETS CURRENT BLOG IN BLOG STATE TO SELECTED BLOG
  const onClickView = () => {
    dispatch(setCurrentBlog(blog));
  };

  // TRIGGERS BlopPopup COMPONENT, SET addOrEdit to false
  // BlogPopup will be set to edit
  // SETS SELECTED BLOG AS currentBlog so title will appear in Blogpopup FORM TITLE
  const onClickEdit = () => {
    dispatch(editBlogPopup());
    dispatch(setAddOrEdit(false));
    dispatch(setCurrentBlog(blog));
  };

  // TRIGGERS DELETION OF BLOG IN BLOG COLLECTION AND BLOG IMAGE IN BLOGIMAGES BUCKET
  // RERENDERS BLOG AFTER SMALL TIMEOUT TO DISPLAY BLOGS WITHOUT DELETE BLOG
  const onClickDelete = () => {
    dispatch(deleteBlog(blog));
    dispatch(deleteBlogImage(blog.image));
    setTimeout(() => {
      dispatch(getBlogs());
    }, 500);
  };

  // RERENDERS DISPLAY OF BLOG IMAGE UPON BLOG IMAGE CHANGE
  useEffect(() => {
    setBackgroundImage(
      `${window.location.origin}${process.env.REACT_APP_API_URL}/blog/blogImage/${blog.image}`
    );
  }, [blog.image]);

  return (
    <div className=' blog__item'>
      <div className='blog__title-section'>
        <h4 className='blog__title'>{blog.title}</h4>
      </div>
      <img
        className='blog__background'
        src={backgroundImage}
        alt='blog background'
      />
      <div className='blog__item__hover-gradient'>
        {/* GARBAGE ICON WHICH DELETES BLOGS */}
        <svg
          className='blog__item__button blog__item__button--trash'
          onClick={onClickDelete}
        >
          <use href={sprite + '#trash'}></use>
        </svg>
        {/* LINK WIHICH SETS CURRENT  BLOG AND GOES TO SELECTED BLOG */}
        <Link
          className='blog__item__button blog__item__button--view'
          to='/blog'
          style={{ color: '#fff' }}
          onClick={onClickView}
        >
          View Blog
        </Link>
        {/* SETS BLOGPOPUP TO EDIT AND TRIGGERS BLOGPOPUP FORM */}
        <a
          href='#!'
          className='blog__item__button blog__item__button--edit'
          onClick={onClickEdit}
        >
          <p>Edit Blog</p>
        </a>
      </div>
    </div>
  );
}

export default BlogItem;
