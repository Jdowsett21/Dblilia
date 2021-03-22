import React from 'react';

function EditItem({ userData }) {
  return (
    <Form.Item
      required
      label={label}
      hasFeedback
      validateStatus={errors.password && touched.password ? 'error' : 'success'}
    >
      <Input
        id='password'
        placeholder='Enter your password'
        type='password'
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.password && touched.password
            ? 'text-input error'
            : 'text-input'
        }
      />
      {errors.password && touched.password && (
        <div className='input-feedback'>{errors.password}</div>
      )}
    </Form.Item>
  );
}

export default EditItem;
