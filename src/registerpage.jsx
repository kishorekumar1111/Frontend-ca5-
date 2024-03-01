import React, { useState, useEffect } from 'react';
import "./register.css";

const Registerpage = () => {
  const initialValues = { name: '', email: '', password: '', repeatPassword: '' };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;

    // Validate Name
    if (!values.name || values.name.length < 3 || values.name.length > 30) {
      errors.name = 'Name should be between 3 and 30 characters';
    }

    // Validate Email
    if (!values.email || !emailRegex.test(values.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate Password
    if (!values.password || !passwordRegex.test(values.password)) {
      errors.password =
        'Password should be at least 10 characters long and contain at least one special character';
    }

    // Validate Repeat Password
    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Passwords do not match';
    }

    return errors;
  };

  const isFormValid = () => {
    const errors = validate(formValues);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="form-container">
      <h3>Register User</h3>
      <form onSubmit={handleSubmit}>
        <div className="sub-containers">
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
          <p>{formErrors.name}</p>
        </div>

        <div className="sub-containers">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <p>{formErrors.email}</p>
        </div>

        <div className="sub-containers">
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <p>{formErrors.password}</p>
        </div>

        <div className="sub-containers">
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <br />
          <input
            type="password"
            name="repeatPassword"
            value={formValues.repeatPassword}
            onChange={handleChange}
          />
          <p>{formErrors.repeatPassword}</p>
        </div>

        <button className='submit-btn' type="submit">
          Sign up
        </button>
      </form>

      {isSubmit && Object.keys(formErrors).length === 0 && (
        <div className="success-message">
          User Registered successfully!
        </div>
      )}
    </div>
  );
};

export default Registerpage;