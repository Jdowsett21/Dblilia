import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import BlogPopup from './BlogPopup';
import { editBlogPopup } from '../../../../../_actions/render_actions';
import { getBlogs, setAddOrEdit } from '../../../../../_actions/blog_actions';
import BlogItem from './BlogItem';

function BlogCards({ blog: { blogList }, render: { editBlog } }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [editBlog, dispatch]);

  const onClickAdd = () => {
    dispatch(editBlogPopup());
    dispatch(setAddOrEdit(true));
  };

  return (
    <>
      <section className='blogs'>
        <div className='blog__header'>
          <h2 className='blog__header--heading'>Your Blog Posts</h2>
        </div>
        {blogList.length === 0 ? (
          <p className='blog__header--secondary'>
            Click Add Blog to Add your first blog!
          </p>
        ) : (
          <p className='blog__header--secondary'>
            Here you can view edit and delete your blog posts
          </p>
        )}
        <button className='blog__add-button' onClick={onClickAdd}>
          Add Blog
        </button>
        <div className='blog'>
          {blogList &&
            blogList.map((blog) => <BlogItem blog={blog} key={blog._id} />)}
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
          <BlogPopup />
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
