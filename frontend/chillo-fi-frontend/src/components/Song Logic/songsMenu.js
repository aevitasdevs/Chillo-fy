import { useState } from "react";
import { Link } from "react-router-dom";

function SongMenu() {
    return (
    <>
        <ul>
            <li>
            <Link to="/hear">
                <button>Hear songs</button>
            </Link>
            </li>
            <li>
            <Link to="/upload">
                <button>Upload songs</button>
            </Link>
            </li>
            <li>
            <Link to="/delete">
                <button>Delete songs</button>
            </Link>
            </li>
        </ul>
    </>
    )
}

export default SongMenu