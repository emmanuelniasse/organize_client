import React, { useContext, useEffect, useState } from "react";
import { toast } from "../Components/Toast/Toast.jsx";
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [flashMessage, setFlashMessage] = useState("");

    const userInformations = {
        isLoggedIn,
        setIsLoggedIn,
        flashMessage,
        setFlashMessage,
    };

    useEffect(() => {
        toast(flashMessage);
    }, [flashMessage]);

    return (
        <AuthContext.Provider value={userInformations}>
            {props.children}
        </AuthContext.Provider>
    );
}
