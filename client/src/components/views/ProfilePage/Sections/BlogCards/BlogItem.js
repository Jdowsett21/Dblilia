import React from 'react';
import { editBlogPopup } from '../../../../../_actions/render_actions';
import { useDispatch } from 'react-redux';
import {
  deleteBlog,
  setAddOrEdit,
  setCurrentBlog,
  getBlogs,
} from '../../../../../_actions/blog_actions';
import { Link } from 'react-router-dom';
import sprite from '../../../../../img/sprite.svg';
function BlogItem({ blog }) {
  const dispatch = useDispatch();

  const onClickView = () => {
    dispatch(setCurrentBlog(blog));
  };
  const onClickEdit = () => {
    dispatch(editBlogPopup());
    dispatch(setAddOrEdit(false));
    dispatch(setCurrentBlog(blog));
  };

  const onClickDelete = () => {
    dispatch(deleteBlog(blog));
    setTimeout(() => {
      dispatch(getBlogs());
    }, 500);
  };
  const backgroundImage = `/uploads/${blog.userId}/blog/${blog.image}`;
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
        <svg
          className='blog__item__button blog__item__button--trash'
          onClick={onClickDelete}
        >
          <use href={sprite + '#trash'}></use>
        </svg>
        <Link
          className='blog__item__button blog__item__button--view'
          to='/blog'
          style={{ color: '#fff' }}
          onClick={onClickView}
        >
          View Blog
        </Link>
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
