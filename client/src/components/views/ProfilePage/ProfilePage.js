import React from 'react';
import { connect } from 'react-redux';
import ProfileCard from './Sections/ProfileCard/ProfileCard';
import BlogCards from './Sections/BlogCards/BlogCards';
import { Redirect } from 'react-router';

function ProfilePage({ userData }) {
  return (
    <>
      {userData && !userData.isAuth && <Redirect to='/login' />}
      {userData && <ProfileCard userData={userData} />}
      <BlogCards />
    </>
  );
}

const mapStatetoProps = (state) => ({
  userData: state.user.userData,
});
export default connect(mapStatetoProps)(ProfilePage);
