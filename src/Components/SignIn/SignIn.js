import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import UseFirebase from '../../Hooks/Usefirebase';
import './../Signup/Signup.css'
const Signup = () => {
    const [loginData, setLoginData] = useState({})
    const {logIn, user, isLoading} = UseFirebase()
    const navigate = useNavigate()
    const location = useLocation()
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
          logIn(loginData?.email, loginData?.password, location, navigate)
        console.log(user)
      }
    return (
        <div>
            <section class="login-form-wrap">
  <h1>Please Sign in</h1>
  <form class="login-form" onSubmit={handleSubmit}>
    
    <label>
      <input onBlur={handleInput} type="email" name="email" required placeholder="Email" />
    </label>
    <label>
      <input onBlur={handleInput} type="password" name="password" required placeholder="Password" />
    </label>
    <button type="submit">{isLoading? <Spinner animation="border" />: 'Login' }</button>
  </form>
  <h5><a href="/signup">Register</a></h5>
</section>
        </div>
    );
};

export default Signup;