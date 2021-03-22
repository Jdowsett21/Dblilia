import React from 'react';
function ProfileItem({ item, label }) {
  return <p className='profile-card__info9'>{`${label}: ${item}`}</p>;
}

export default ProfileItem;
