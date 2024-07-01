import React from "react";
import { Link } from "react-router-dom";

function NotFoundError ({setError}) {
    return(
        <>
            <h1>Song not found.</h1>
            <Link to="/hear">
                <button onClick={setError}>Try again</button>
            </Link>
        </>
    ) 
    
}

export default NotFoundError