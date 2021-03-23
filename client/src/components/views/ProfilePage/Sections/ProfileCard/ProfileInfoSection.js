import React from 'react';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { editProfile } from '../../../../../_actions/render_actions';

function ProfileInfoSection({ userData, editProfile }) {
  {
    /* TOGGLES CHANGE FROM VIEW INFO TO EDIT INFO*/
  }
  const onClick = () => {
    editProfile();
  };
  return (
    <div className='profile-card__info-section'>
      <h2 className='profile-card__info-header'>Profile Info</h2>
      {/* DISPLAYS PROFILE INFO */}
      <ProfileItem item={userData.name} label='First Name' />
      <ProfileItem item={userData.lastname} label='Last Name' />
      <ProfileItem item={userData.email} label='Email Address' />

      {/* TOGGLES CHANGE FROM VIEW INFO TO EDIT INFO*/}
      <button onClick={onClick} className='profile-card__button'>
        Edit Info
      </button>
    </div>
  );
}

export default connect(null, { editProfile })(ProfileInfoSection);
