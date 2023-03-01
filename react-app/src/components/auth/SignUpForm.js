import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()


useEffect(() => {
  let errorsArr = [];

  if (!(username && email && password && repeatPassword)) errorsArr.push("All fields must be filled out")
  if (password !== repeatPassword) errorsArr.push("Passwords must match")
  
  
  setErrors(errorsArr);

}, [username, email, password, repeatPassword]);


  const onSignUp = async (e) => {
    e.preventDefault();

    if (errors.length === 0) {
        
      await dispatch(signUp(username, email, password))

      await history.push(`/`)
      return
  } else {
      return setErrors(errors)
  }
}
   

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  // const updateFirstName = (e) => {
  //   setFirstName(e.target.value);
  // };

  // const updateLastName = (e) => {
  //   setLastName(e.target.value);
  // };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className="signup-form">
      <h1>Sign up</h1>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='email'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      {/* <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div> */}
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        {errors.map((error, ind) => (
          <div className="signup-errors" key={ind}>{error}</div>
        ))}
      </div>
      {

      errors.length === 0 && <button type='submit'>Sign up</button>
      } 
    </form>
  );
};

export default SignUpForm;
