import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';

function PrivateRoute () {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                if ( token ) {
                    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/current`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setIsAuthenticated(true);
                    setUserData(response.data);
                } else {
                    setIsAuthenticated(false);
                };
            } catch (err) {
                setIsAuthenticated(false);
                console.error('Token verification failed:', err.response.data.message);
            };
        };

        verifyToken();
    }, [token]);

    if (isAuthenticated) {
        console.log('Welcome,', userData.username);
        return <Outlet />;
    } else if (isAuthenticated === null) {
        return <div>Loading...</div>
    } else {
        return <Navigate to='/login' />; 
    };

};

export default PrivateRoute;