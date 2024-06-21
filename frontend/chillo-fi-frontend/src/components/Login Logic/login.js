import React, { useContext, useState } from "react";
import NotLoggedIn from "./notloggedin";
import LoggedIn from "./loggedin";
import UserNotFound from "./usernotfound";
import { LoginContext } from "../../Contexts/LoginContext";

function Login() {
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)
    const [userNotFound, setUserNotFound] = useState(false)
    
    const changeState = () => {
        
        if (isLoggedIn) {
            localStorage.removeItem("token")
        }
        setIsLoggedIn(!isLoggedIn);
    }
    const tryAgain = () => {
        setUserNotFound(false)
    }
    const userNotFoundError = () => {
        setUserNotFound(true)
    }

    return userNotFound? <UserNotFound onsubmit={tryAgain}/> :
    (isLoggedIn ? <LoggedIn /> : 
    <NotLoggedIn onsubmit={changeState} userError={userNotFoundError}/>)
}

export default Login