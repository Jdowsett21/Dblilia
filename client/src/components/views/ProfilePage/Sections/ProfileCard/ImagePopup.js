import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { updateProfileImage, auth } from '../../../../../_actions/user_actions';
import { editImagePopup } from '../../../../../_actions/render_actions';
function ImagePopup(props) {
  const dispatch = useDispatch();
  const [file, setFileName] = useState('');
  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const onClose = () => {
    setFileName('');
    dispatch(editImagePopup());
  };
  const changeOnClick = (e) => {
    e.preventDefault();
    if (file !== '') {
      dispatch(updateProfileImage(file));
      dispatch(editImagePopup());
      dispatch(auth());
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

export default ImagePopup;
