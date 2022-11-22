import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';


const DisplayError = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(result => {
                navigate('/login')
            })
            .catch(err => console.error(err))
    }
    return (
        <div>
            <p className="text-red-600">Somethings went wrong</p>
            <p className="text-red-500">{error.statusText || error.message}</p>
            <h4 className="text-3xl">please <button onClick={handleLogOut} >Log Out</button> Or Log back in </h4>
        </div>
    );
};

export default DisplayError;