import { useState } from "react";
import { Link } from "react-router-dom";

const url = "http://127.0.0.1:8000/songs/create"
function UploadSong() {
    const [songName, setSongName] = useState('')
    const [songFile, setSongFile] = useState(null)
    const [posterFile, setPosterFile] = useState(null)

    const uploadSong = (name, audio, poster) => {
        let formData = new FormData()
        formData.append("songName", name);
        formData.append("song", audio);
        formData.append("poster", poster)
        const token = localStorage.getItem("token")
        try{
            const response = fetch(url, {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.ok){
                alert(`Song with name ${name} uploaded successfully.`);
            }
        }
        catch (error) {
            console.error("Error uploading song: ", error)
        }
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("this shi fire!!");
        uploadSong(songName, songFile, posterFile);
    }
    
    return (
        <>
            <h1>Let the world hear your tunes!</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder="Enter song name" 
                onChange={(e) => setSongName(e.target.value)}
                value={songName} /> 
                <br />
                <label>Enter song file: </label>
                <input type="file" 
                placeholder="Enter song file (mpeg)" 
                onChange={(e) => setSongFile(e.target.files[0])}
                />
                <br />
                <label>Enter poster file: </label>
                <input type="file" 
                placeholder="Enter the poster for your song" 
                onChange={(e) => setPosterFile(e.target.files[0])}
                />
                <br />
                <button type="submit">Upload song</button>
            </form>
            <br />
            <Link to="/">
                <button>Home</button>
            </Link>
        </>
    )
}

export default UploadSong