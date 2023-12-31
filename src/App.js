import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialValues = { username: '', email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    //console.log(formErrors);
    if (Object.keys(formErrors) === 0 && isSubmit) {
      console.log(formValues)
    }
  }, [formErrors])

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    setFormValues(initialValues);
    setTimeout(() => setIsSubmit(false), 3000);
  }

  function validate(values) {
    let errors = {};
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let alphabetRegex = /^[a-zA-Z]+$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!values.username) {
      errors.username = "Username is required!"
    }
    else if (!alphabetRegex.test(values.username)) {
      errors.username = "Username should only contain alphabets!"
    }

    if (!values.email) {
      errors.email = "Email is required!"
    }
    else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!"
    }

    if (!values.password) {
      errors.password = "Password is required!"
    }
    else if (!passwordRegex.test(values.password)) {
      errors.password = "Password should contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number"
    }
    return errors;
  }

  return (
    <div className="container">
      {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='message'>Signed In Sucessfully</div>) : ''}
      <form onSubmit={handleSubmit}>
        <h1>Validate PRO</h1>
        <label for="username">Name</label>
        <input type="text" name="username" value={formValues.username} onChange={handleChange} />
        <pre>{formErrors.username}</pre>
        <label for="email">Email</label>
        <input type="text" name="email" value={formValues.email} onChange={handleChange} />
        <pre>{formErrors.email}</pre>
        <label for="password">Password</label>
        <input type="password" name="password" value={formValues.password} onChange={handleChange} />
        <pre>{formErrors.password}</pre>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
