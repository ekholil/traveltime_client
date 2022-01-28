import React from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../Hooks/useAuth'
const MyAccount = () => {
    const {user, admin} = useAuth()
    return (
        <Container className='text-center pb-5 mb-5' style={{minHeight:'70vh', backgroundColor:'white', marginTop: '50px', padding: '100px 0'}}>
            <h4>My Account</h4>
            <h2>Welcome {user.displayName}</h2>
            {admin? <h3>You are an Admin</h3>: <h3>You are a general user</h3>}
            {user.emailVerified? <h1>Your Account is Verified</h1>: <h1>Please Verify your Account</h1>}
            <h4>Your Email Is : {user.email}</h4>
        </Container>
    );
};

export default MyAccount;