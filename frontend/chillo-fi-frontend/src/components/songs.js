import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = "http://127.0.0.1:8000" 
function Songs(){
    const [id, setId] = useState('')
    const [audioLink, setAudioLink] = useState('')
    const [searching, setSearching] = useState(false)
    const audioRef = useRef(null)

    const fetchSongs = async (id) => {
        const token = localStorage.getItem("token")
        const response = await fetch (`${url}/songs/song?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok){
            console.log("Successfully loaded song with id:" + id)
        }
        else {
            console.error("Couldn't load all songs")
        }

        return response.blob()
    }

    async function handleSubmit(e){
        e.preventDefault();
        setSearching(true);
        let audioBlob = await fetchSongs(id);
        let newUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current){ 
            audioRef.current.pause();
            audioRef.current.source = newUrl;
        }
        
        setAudioLink(newUrl);
        setSearching(false);
    }

    useEffect(() => {
        if (audioLink && audioRef.current) {
            audioRef.current.load();
        }
    }, [audioLink]);
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange= {e => setId(e.target.value)} value={id} />
                <button type="submit">Find Song.</button>
            </form>

            { audioLink ? <audio controls ref={audioRef}>
                <source src={audioLink} type="audio/mpeg" />
            </audio> :
            searching ? (<p>Loading...</p>) : (<p>Search for song with id</p>)
            }
            <br />
            <Link to="/">
                <button>Home</button>
            </Link>
        </>
    )
}

export default Songs