import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  updateProfileImage,
  auth,
  getUpdatedProfile,
  getProfileImages,
} from '../../../../../_actions/user_actions';
import { editImagePopup } from '../../../../../_actions/render_actions';

function ImagePopup({ userData }) {
  const dispatch = useDispatch();
  const [file, setFileName] = useState('');
  const onChangeFile = (e) => {
    e.preventDefault();
    setFileName(e.target.files[0]);
  };

  const onClose = (e) => {
    e.preventDefault();
    setFileName('');
    dispatch(editImagePopup());
  };
  const changeOnClick = (e) => {
    e.preventDefault();
    if (file !== '') {
      dispatch(updateProfileImage(file));
      dispatch(getProfileImages());
      dispatch(editImagePopup());
      setTimeout(() => {
        dispatch(auth());
      }, 500);
    }
    e.target.value = null;
    setFileName('');
  };
  return (
    <>
      <form
        className='image__form'
        onSubmit={changeOnClick}
        encType='multipart/form-data'
      >
        <button className='popup__close' onClick={onClose}>
          &times;
        </button>
        <label htmlFor='file' className='image__label'>
          Upload Profile Image
        </label>
        <input
          type='file'
          accept='image/x-png,image/gif,image/jpeg'
          filename='profileImage'
          className='image__input'
          onChange={onChangeFile}
        />
        <button type='submit' className='image__button'>
          Submit
        </button>
      </form>
    </>
  );
}
const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(ImagePopup);
