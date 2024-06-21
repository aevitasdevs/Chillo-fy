import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";

function Home() {
 
  return (
    <>
      <ul>
        <LoginButton />
        <li>
          <Link to="/songs">
            <button>Songs</button>
          </Link>
        </li>
      </ul>
    </>
    )
}

function LoginButton() {
  const {isLoggedIn} = useContext(LoginContext)

  return isLoggedIn ?
    (<li>
      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </li>) : 
    (<li>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </li>)

}

export default Home