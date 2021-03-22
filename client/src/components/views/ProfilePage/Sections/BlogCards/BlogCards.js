import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import BlogPopup from './BlogPopup';
import { editBlogPopup } from '../../../../../_actions/render_actions';
import { getBlogs } from '../../../../../_actions/blog_actions';
import BlogItem from './BlogItem';

function BlogCards({ blog: { blogList }, render: { editBlog } }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [editBlog]);

  const [addOrEdit, setAddOrEdit] = useState('');

  const onClickAdd = () => {
    dispatch(editBlogPopup());
    setAddOrEdit(true);
  };

  return (
    <>
      <section className='blogs'>
        <div className='blog__header'>
          <h2 className='blog__header--heading'>Your Blog Posts</h2>
        </div>
        <p className='blog__header--secondary'>
          Here you can view edit and delete your blog posts
        </p>
        <button onClick={onClickAdd}>Add Blog</button>
        <div className='blog'>
          {blogList && blogList.map((blog) => <BlogItem blog={blog} />)}
        </div>
      </section>
      <div className={editBlog ? 'popup popup--visible' : 'popup'}>
        <div
          className={
            editBlog
              ? 'popup__content popup__content--visible'
              : 'popup__content'
          }
        >
          <BlogPopup addOrEdit={addOrEdit} />
        </div>
      </div>
    </>
  );
}
const mapStatetoProps = (state) => ({
  blog: state.blog,
  render: state.render,
});
export default connect(mapStatetoProps)(BlogCards);
