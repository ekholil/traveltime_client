import React from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../Hooks/useAuth'
const MyAccount = () => {
    const {user} = useAuth()
    return (
        <Container className='text-center' style={{height:'70vh', backgroundColor:'white', marginTop: '50px', padding: '100px 0'}}>
            <h4>My Account</h4>
            <h2>Welcome {user.displayName}</h2>
            {user.emailVerified? <h1>Your Account is Verified</h1>: <h1>Please Verify your Account</h1>}
            <h4>Your Email Is : {user.email}</h4>
        </Container>
    );
};

export default MyAccount;