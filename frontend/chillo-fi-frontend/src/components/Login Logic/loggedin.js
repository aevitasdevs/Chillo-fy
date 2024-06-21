import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";

function LoggedIn(){
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)
    const handleClick = () => {
            localStorage.removeItem("token");
            setIsLoggedIn(false)
        }
    return (
        <>
            <h1>You are already logged in :))</h1>
            <Link to="/login">
                <button onClick={handleClick}>Click me to logout.</button>
            </Link> 
            <br />
            <Link to="/">
                <button>Home</button>
            </Link>
        </>
    )
}

export default LoggedIn