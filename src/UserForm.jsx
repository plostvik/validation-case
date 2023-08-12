import { useDispatch } from 'react-redux';
import { setUserInfo } from 'store/actions';
import { useState } from 'react';
import { isEmail, isEmpty, isLength } from 'validator';

import styles from './UserForm.module.css';

function UserForm() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const updateStore = newData => {
    dispatch(setUserInfo(newData));
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => {
      delete prev[name];
      return { ...prev };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const validationErrors = validateForm(formState);

    if (Object.keys(validationErrors).length === 0) {
      updateStore(formState);
      alert('Info has been submitted to the store!');
      return;
    }

    setErrors(validationErrors);
  };

  return (
    <div className={styles['form-container']}>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formState.firstName} onChange={handleChange} />
          {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formState.lastName} onChange={handleChange} />
          {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formState.email} onChange={handleChange} />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </label>
        <br />
        <label>
          Message:
          <textarea name="message" value={formState.message} onChange={handleChange} />
          {errors.message && <div className={styles.error}>{errors.message}</div>}
        </label>
        <br />
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;

const validateForm = formState => {
  const errors = {};
  const { firstName, lastName, email, message } = formState;

  if (isEmpty(firstName)) errors.firstName = 'First name is required';
  if (isEmpty(lastName)) errors.lastName = 'Last name is required';
  if (!isEmail(email)) errors.email = 'Enter a valid email address';
  if (!isLength(message, { min: 10 })) errors.message = 'Message must be at least 10 characters long';

  return errors;
};
