import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
    <>
        <ul>
        <li>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </li>
        <li>
          <Link to="/songs">
            <button>Songs</button>
          </Link>
        </li>
      </ul>
    </>
    )
}

export default Home