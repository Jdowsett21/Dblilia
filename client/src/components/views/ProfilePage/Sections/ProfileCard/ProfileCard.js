import React, { useEffect } from 'react';
import ProfileImage from './ProfileImage';
import { connect, useDispatch } from 'react-redux';
import EditProfileCard from './EditProfileCard';
import { auth } from '../../../../../_actions/user_actions';
import ProfileInfoSection from './ProfileInfoSection';

function ProfileCard({ render: { editProfile, editImage }, user }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth());
  }, [editProfile, editImage, dispatch]);

  return (
    <div className='profile-card'>
      <h1 className='profile-card__header'>Profile Card</h1>
      {/* TOGGLES BETWEEN DISPLAYING USER DATA AND FORM TO EDIT USER DATA */}
      {editProfile ? (
        <EditProfileCard userData={user} />
      ) : (
        <ProfileInfoSection userData={user} />
      )}
      <ProfileImage userData={user} />
    </div>
  );
}

const mapStatetoProps = (state) => ({
  render: state.render,
  user: state.user.userData,
});
export default connect(mapStatetoProps, { auth })(ProfileCard);
