import React from 'react';
import { connect } from 'react-redux';
import ImagePopup from './ImagePopup';
import { useDispatch } from 'react-redux';
import { editImagePopup } from '../../../../../_actions/render_actions';

function ProfileImage({ userData, render: { editProfile, editImage } }) {
  const newImage = `uploads/${userData._id}/profile/${userData.image}`;
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(editImagePopup());
  };

  return (
    <>
      <div className='profile-card__image-section'>
        <img
          src={userData.originalImage ? `${userData.image}` : newImage}
          alt='profile'
          className={
            editProfile
              ? 'profile-card__image : profile-card__image--edit'
              : 'profile-card__image'
          }
        />

        <a
          href='#!'
          onClick={onClick}
          className={
            editProfile
              ? 'profile-card__button--edit profile-card__button'
              : 'profile-card__button'
          }
        >
          Edit Profile Image
        </a>
      </div>

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
});
export default connect(mapStatetoProps)(ProfileImage);
