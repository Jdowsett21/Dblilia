import React from 'react';
import { Menu } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { setCurrentBlog } from '../../../../_actions/blog_actions';
import { NavLink } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

function LeftMenu({ mode, blog: { blogList } }) {
  const dispatch = useDispatch();
  return (
    <Menu mode={mode}>
      <Menu.Item key='mail'>
        <a href='/'>Home</a>
      </Menu.Item>
      <SubMenu title={<span>Blogs</span>}>
        {/* BLOG IS AUTOMATICALLY ADDED TO DROPDOWN MENU UPON CREATION
        AND DISPLAYED BY TITLE */}
        {blogList.map((blog) => (
          <Menu.Item
            key={blog._id}
            // BLOG SELECTED IN DROPDOWN IS SET TO CURRENT BLOG
            // CURRENT BLOG IS PULLED IN BlogPage AND DISPLAYED
            onClick={() => dispatch(setCurrentBlog(blog))}
          >
            <NavLink to='/blog'>{blog.title}</NavLink>
          </Menu.Item>
        ))}
      </SubMenu>
      <Menu.Item key='profile'>
        <a href='/profile'>Profile</a>
      </Menu.Item>
    </Menu>
  );
}

const mapStateToProps = (state) => ({
  blog: state.blog,
});
export default connect(mapStateToProps)(LeftMenu);
