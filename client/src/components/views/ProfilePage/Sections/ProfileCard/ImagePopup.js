import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  updateProfileImage,
  auth,
  deleteOldProfile,
} from '../../../../../_actions/user_actions';
import { editImagePopup } from '../../../../../_actions/render_actions';

function ImagePopup() {
  const dispatch = useDispatch();

  // PROFILE IMAGE STATE INFO
  const [file, setFileName] = useState('');

  // SET PROFILE IMAGE VALUE
  const onChangeFile = (e) => {
    e.preventDefault();
    setFileName(e.target.files[0]);
  };

  // RESETS INFORMATION
  // CLOSES POPUP
  const onClose = (e) => {
    e.preventDefault();
    setFileName('');
    dispatch(editImagePopup());
  };

  // SUBMITS FORMS
  const changeOnClick = (e) => {
    // PREVENTS PAGE RELOAD
    e.preventDefault();

    // ONLY SUBMITS IF FILE SELECTED
    if (file !== '') {
      // UPLOADS NEW PROFILE IMAGE TO PROFILEIMAGE BUCKET
      dispatch(updateProfileImage(file));
      // DELETES OLD PROFILE IMAGE
      dispatch(deleteOldProfile());
      // CLOSES POPUP
      dispatch(editImagePopup());

      // RERENDERS NEW PROFILE IMAGE
      setTimeout(() => {
        dispatch(auth());
      }, 500);
    }
    // RESETS ALL VALUES
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
          accept='image/png,image/jpeg'
          filename='defaultProfileImage'
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
