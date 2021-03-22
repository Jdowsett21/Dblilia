import React from 'react';
import { editBlogPopup } from '../../../../../_actions/render_actions';
import { useDispatch } from 'react-redux';

function BlogItem({ blog }) {
  const dispatch = useDispatch();
  const onClickEdit = () => {
    dispatch(editBlogPopup());
    setAddOrEdit(false);
  };
  const backgroundImage = `/uploads/${blog.userId}/${blog.image}`;
  return (
    <div
      style={{ textDecoration: 'none' }}
      href='/services#modern'
      className=' blog__item'
    >
      <div className='heading-4__section'>
        <h4 className='heading-4'>{blog.title}</h4>
      </div>
      <img
        className='blog__background'
        src={backgroundImage}
        alt='blog background'
      />
      <div className='blog__item__hover-gradient'>
        <a
          className='blog__item__button blog__item__button--view'
          style={{ textDecoration: 'none' }}
        >
          <p className='blog__button-text'>View Blog</p>
        </a>
        <a
          className='blog__item__button blog__item__button--edit'
          style={{ textDecoration: 'none' }}
        >
          <p onClick={onClickEdit} className='blog__button-text'>
            Edit Blog
          </p>
        </a>
      </div>
    </div>
  );
}

export default BlogItem;
