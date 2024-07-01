import { useState } from "react"
import { Link } from "react-router-dom"
import SongNotFoundError from "./songNotFound"
import React from 'react';

const url = "http://127.0.0.1:8000/songs/delete"

function DeleteSong() {
    const [songName, setSongName] = useState('')
    const [songError, setSongError] = useState(false)
    
    const deleteSong = async (name) => {
        const formData = new FormData()
        formData.append("songName", name)
        const token = localStorage.getItem("token")
        try{
            const response = await fetch(url, {
            method: "DELETE",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            }
            })
            const data = await response.json()
            if(response.ok){
            console.log("this shi not fire.")
            }
            else if (response.status === 404) {
                setSongError(true)
            }
        }
        catch (error) {
            alert(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        deleteSong(songName)
        setSongName("")
    }
    
    const songErrorStateChanger = () => {
        setSongError(false)
    } 

    return (
        <>
            {songError ? 
             <SongNotFoundError setSongNotFoundError={songErrorStateChanger} />
             : 
             <>
             <form onSubmit={handleSubmit}>
             <input type="text" 
             value={songName}
             onChange={(e) => setSongName(e.target.value)}
             placeholder="Enter Song name that you want to delete" />
             <br />
             <button type="submit">Delete</button>
             </form>
             <br />
             <Link to="/">
             <button>Home</button>
             </Link>
             </>}
        </>
    )
}

export default DeleteSong