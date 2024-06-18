import React, { useState } from "react";
import { Link } from "react-router-dom";

function NotLoggedIn({onsubmit}){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const login = async (username, password) => {
        try{
            const response = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'username': username,
                'password': password
            })
        })
        const data = await response.json();
        if (response.ok){
            console.log(data)
            localStorage.setItem('token', data.token)
        } else {
            console.error(data.detail)
        }
        }catch(error){
            console.error("Couldn't login: ", error)
        }
    } 
    function handleSubmit(e){
        e.preventDefault();
        login(userName, password);
        onsubmit();
    }

    return (
        <>
        <h1>Login Page!</h1>
        <form onSubmit={handleSubmit}>
            <label>Username:  
                <input onChange={e => setUserName(e.target.value)} 
                value={userName} 
                id="username" 
                type="text" 
                placeholder="Enter username"/>
            </label>
            <br />
            <label>Password:  
                <input onChange={e => setPassword(e.target.value)} 
                value={password} 
                id="password" 
                type="password" 
                placeholder="Enter password"/>
            </label>            
            <br />
            <button type="submit">Submit</button>
         </form>
        </>
    )
}

function LoggedIn({onsubmit}){
    return (
        <>
            <h1>You are already logged in :))</h1>
            <button onClick={onsubmit}>Click me to logout.</button>
        </>
    )
}

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const login = () => {
        setIsLoggedIn(true)
    }
    const logout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
    }
    if (isLoggedIn) {
        return <LoggedIn onsubmit={logout}/>
    }
    else {
        return <NotLoggedIn onsubmit={login}/>
    }
}

export default Login