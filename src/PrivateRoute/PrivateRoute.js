import { Spinner } from 'react-bootstrap';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseFirebase from '../Hooks/Usefirebase';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = UseFirebase()
    let location = useLocation();
    if (isLoading) { return <Spinner animation='border' /> }
    if (user.email) {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRoute;