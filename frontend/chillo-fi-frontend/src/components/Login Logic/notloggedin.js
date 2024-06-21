import React, { useState } from "react";
import { Link } from "react-router-dom";

function NotLoggedIn({onsubmit, userError}){
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
            onsubmit();
        } else if (response.status === 404) {
            console.error("Error logging in: User not found");
            userError();
        }
        } catch (error) {
            console.error("Couldn't login: ", error)
        }
    } 
    function handleSubmit(e){
        e.preventDefault();
        if (userName !== "" & password !== ""){
            login(userName, password);
        }
        else {
            alert("Please fill all the fields.")
        }
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
         <Link to="/">
            <button>Home</button>
         </Link>
        </>
    )
}

export default NotLoggedIn