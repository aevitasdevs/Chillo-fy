import { Link } from "react-router-dom"
import React from 'react';

function SongNotFoundError({setSongNotFoundError}) {
    return (
        <>  
            <h1>Ehhh!</h1>
            <p>Song doesnt exist</p>
            <Link to="/delete">
                <button onClick={setSongNotFoundError}>Try again</button>
            </Link>
        </>
    )
}

export default SongNotFoundError