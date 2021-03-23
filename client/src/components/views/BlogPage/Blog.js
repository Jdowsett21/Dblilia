import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Banner from '../../../common/Banner';
import { useDispatch } from 'react-redux';
import { getBlogs } from '../../../_actions/blog_actions';

function Blog({ blog: { currentBlog, blogList } }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  return (
    <div>
      {/* IF BLOG PAGE IS  VISITED BY CLICKING ON BLOG IN NAV BAR
       ALL BLOGS WILL DISPLAY
       IF ONE BLOG IS SELECTED FROM DROPDOWN MENU OR VIEW BLOG BUTTON IN VIEW CARDS, 
       THAT BLOG WILL DISPLAY */}
      {currentBlog === '' ? (
        blogList.map((blogItem) => <Banner currentBlog={blogItem} />)
      ) : (
        <Banner currentBlog={currentBlog} />
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  blog: state.blog,
});
export default connect(mapStateToProps)(Blog);
