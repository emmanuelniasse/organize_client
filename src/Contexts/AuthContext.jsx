import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies('token');

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const userInformations = {
        isLoggedIn,
        setIsLoggedIn,
    };

    useEffect(() => {
        console.log(cookies.token);
        // PIN
        // if (cookies.token) {
        //     setIsLoggedIn(true);
        // } else {
        //     navigate('/connexion');
        // }
    }, [cookies]);

    return (
        <AuthContext.Provider value={userInformations}>
            {props.children}
        </AuthContext.Provider>
    );
}
