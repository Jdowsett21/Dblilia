import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ImagePopup from './ImagePopup';
import { useDispatch } from 'react-redux';
import { editImagePopup } from '../../../../../_actions/render_actions';

function ProfileImage({ userData, render: { editProfile, editImage } }) {
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    // IF USER HAS UPDATED PROFILE IMAGE
    // DISPLAYS NEW PROFILE IMAGE
    !userData.originalImage &&
      setProfileImage(
        `${window.location.origin}${process.env.REACT_APP_API_URL}/users/image/${userData.image}`
      );
  }, [userData.image]);

  const dispatch = useDispatch();

  const onClick = () => {
    // TOGGLES POPUP TO EDIT PROFILE IMAGE
    dispatch(editImagePopup());
  };

  return (
    <>
      <div className='profile-card__image-section'>
        <img
          // DISPLAYS DEFAULT PROFILE IMAGE OR NEW PROFILE IMAGE IF UPDATED
          src={userData.originalImage ? `${userData.image}` : profileImage}
          alt='profile'
          className={
            // CHANGES PROFILE IMAGE PLACEMENT BASED ON PROFILE INFO IN EDIT OR VIEW MODE
            editProfile
              ? 'profile-card__image : profile-card__image--edit'
              : 'profile-card__image'
          }
        />

        <a
          href='#!'
          // TOGGLES PROFILE IMAGE POPUP FORM
          onClick={onClick}
          // CHANGES BUTTON PLACEMENT BASED ON PROFILE INFO IN EDIT OR VIEW MODE
          className={
            editProfile
              ? 'profile-card__button--edit profile-card__button'
              : 'profile-card__button'
          }
        >
          Edit Profile Image
        </a>
      </div>

      {/* FORM IS HIDDEN IF editImage is false */}
      <div className={editImage ? 'popup popup--visible' : 'popup'}>
        <div
          className={
            editImage
              ? 'popup__content popup__content--visible'
              : 'popup__content'
          }
        >
          <ImagePopup />
        </div>
      </div>
    </>
  );
}

const mapStatetoProps = (state) => ({
  render: state.render,
  userData: state.user.userData,
});
export default connect(mapStatetoProps)(ProfileImage);
