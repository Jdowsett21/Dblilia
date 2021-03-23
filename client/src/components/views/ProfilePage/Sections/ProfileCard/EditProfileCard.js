import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { updateUser } from '../../../../../_actions/user_actions';
import { editProfile } from '../../../../../_actions/render_actions';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function EditProfileCard(props) {
  const dispatch = useDispatch();

  // FORM TO EDIT USER INFORMATION IN PROFILE CARD
  return (
    <div className='profile-card__info-section'>
      <h2 className='profile-card__info-header'>Profile Info</h2>
      {props.userData && (
        <Formik
          initialValues={{
            email: props.userData.email,
            lastName: props.userData.lastname,
            name: props.userData.name,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string()
              .email('Email is invalid')
              .required('Email is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              let dataToSubmit = {
                email: values.email,
                name: values.name,
                lastname: values.lastName,
              };

              dispatch(updateUser(dataToSubmit)).then((response) => {
                if (response.payload.success) {
                  // UPDATES PROFILE INFORMATION
                  dispatch(editProfile());
                } else {
                  alert(response.payload.err.errmsg);
                }
              });

              setSubmitting(false);
            }, 500);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <Form
                style={{ minWidth: '375px' }}
                {...formItemLayout}
                onSubmit={handleSubmit}
              >
                <Form.Item required label='Name'>
                  <Input
                    id='name'
                    // placeholder={props.userData.name}
                    type='text'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.name && touched.name && (
                    <div className='input-feedback'>{errors.name}</div>
                  )}
                </Form.Item>
                <Form.Item required label='Last Name'>
                  <Input
                    id='lastName'
                    placeholder='Enter your Last Name'
                    type='text'
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.lastName && touched.lastName
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.lastName && touched.lastName && (
                    <div className='input-feedback'>{errors.lastName}</div>
                  )}
                </Form.Item>
                <Form.Item
                  required
                  label='Email'
                  hasFeedback
                  validateStatus={
                    errors.email && touched.email ? 'error' : 'success'
                  }
                >
                  <Input
                    id='email'
                    placeholder='Enter your Email'
                    type='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.email && touched.email && (
                    <div className='input-feedback'>{errors.email}</div>
                  )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    onClick={handleSubmit}
                    type='primary'
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default EditProfileCard;
