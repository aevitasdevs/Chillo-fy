import { useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";

const url = "http://127.0.0.1:8000/user/create"

function CreateUser() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')

    const createUser = async (email, username, password) => {
        const newUser = {email: email,
            userName: username,
            password: password}
        
        try {const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            const data = await response.json()
            if(response.status === 200){
                console.log(data)
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordOne === passwordTwo) {
            createUser(email, username, passwordOne)
        }
        else {
            alert("password doesnt match!")
        }   
    }

    return (
        <>
            <form id="form" onSubmit={handleSubmit}>
                <label htmlFor="email">email:</label>
                <input type="text" 
                id="email"
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                />
                <br />
                <label htmlFor="username">username:</label>
                <input type="text" 
                id="username"
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
                />
                <br />
                <label htmlFor="passwordone">password:</label>
                <input type="password" 
                id="passwordone"
                placeholder="Enter your password" 
                value={passwordOne}
                onChange={(e) => {setPasswordOne(e.target.value)}}
                />
                <br />
                <label htmlFor="passwordtwo">repeat password:</label>
                <input type="password" 
                id="passwordtwo"
                placeholder="Repeat your password" 
                value={passwordTwo}
                onChange={(e) => {setPasswordTwo(e.target.value)}}
                />
                <br />
                <button type="submit">Submit</button>
                <br />
                <Link to="/">
                    <button>Home</button>
                </Link>
            </form>
        </>
    )
}

export default CreateUser