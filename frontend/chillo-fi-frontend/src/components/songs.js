import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = "http://127.0.0.1:8000" 
function Songs(){
    const [id, setId] = useState('')
    const [audioLink, setAudioLink] = useState('')
    const [posterLink, setPosterLink] = useState('')
    const [searching, setSearching] = useState(false)
    const audioRef = useRef(null)
    

    const fetchSong = async (id) => {
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

    const fetchPoster = async (id) => {
        const token = localStorage.getItem("token")
        const response = await fetch (`${url}/songs/poster?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok){
            console.log("Successfully loaded poster with id:" + id)
        }
        else {
            console.error("Couldn't load poster")
        }

        return response.blob()
    }

    async function handleSubmit(e){
        e.preventDefault();
        setSearching(true);
        let audioBlob = await fetchSong(id);
        let posterBlob = await fetchPoster(id);
        let songUrl = URL.createObjectURL(audioBlob);
        let posterUrl = URL.createObjectURL(posterBlob);

        if (audioRef.current){ 
            audioRef.current.pause();
            audioRef.current.source = songUrl;
        }
        
        setAudioLink(songUrl);
        setPosterLink(posterUrl);
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
            
            { posterLink &&
             <img style={{height: 200, width: 200}} src= {posterLink} /> 
            }
            
            <br />
            <Link to="/">
                <button>Home</button>
            </Link>
        </>
    )
}

export default Songs