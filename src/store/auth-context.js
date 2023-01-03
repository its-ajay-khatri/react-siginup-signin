import React, { useState } from "react"

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;
    
    return remainingDuration;
}

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');           //find an token if already exists 
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;                      //string to bool

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);                     //localStortage is a synchronous API
        
        const remainingTime = calculateRemainingTime(expirationTime)     //this will be a posivitve value of 1 hour in milliseconds
    
        setTimeout(logoutHandler, remainingTime);                  //automatically will logout the user after that session time
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;