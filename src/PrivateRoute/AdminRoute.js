import { Spinner } from 'react-bootstrap';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseFirebase from './../Hooks/Usefirebase'

const AdminRoute = ({ children, ...rest }) => {
    const { user, admin, isLoading } = UseFirebase()
    const location = useLocation();
    if (isLoading) { return <Spinner animation='border' /> }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} />;

};

export default AdminRoute;