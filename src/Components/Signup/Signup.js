import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import UseFirebase from '../../Hooks/Usefirebase';
import './Signup.css'
const Signup = () => {
    const [loginData, setLoginData] = useState({})
    const {registerUser, user, isLoading} = UseFirebase()
    const navigate = useNavigate()
    const handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const newData = { ...loginData };
        newData[name] = value;
        setLoginData(newData);
        console.log(loginData)
      };
      const handleSubmit = e => {
          e.preventDefault()
        registerUser(loginData?.email, loginData?.password, loginData.name, navigate)
        console.log(user)
      }
    return (
        <div>
            <section class="login-form-wrap">
  <h1>Please Register</h1>
  <form class="login-form" onSubmit={handleSubmit}>
    <label>
      <input onBlur={handleInput} type="text" name="name" required placeholder="Name" />
    </label>
    <label>
      <input onBlur={handleInput} type="email" name="email" required placeholder="Email" />
    </label>
    <label>
      <input onBlur={handleInput} type="password" name="password" required placeholder="Password" />
    </label>
    <button type="submit" >{isLoading? <Spinner animation='border' /> :'Register'}</button>
  <h5><a href="/signin">Already Registered? Sign in</a></h5>
  </form>
</section>
        </div>
    );
};

export default Signup;