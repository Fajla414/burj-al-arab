import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return loggedInUser.email ? children : <Navigate to={'/login'} state={{ from: location }} />
};

export default PrivateRoute;