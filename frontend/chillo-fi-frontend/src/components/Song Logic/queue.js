import React, { useEffect, useState } from "react";

function Queue() {
    const [queue, setQueue] = useState(() => {
        const savedQueue = localStorage.getItem("queue");
        return savedQueue ? JSON.parse(savedQueue) : []
    })
    const [addName, setAddName] = useState('')
    const [removeName, setRemoveName] = useState('')

    useEffect(() => {
        localStorage.setItem("queue", JSON.stringify(queue))
    }, [queue])

    const addToQueue = (song) => {
        setQueue((prevQueue) => [...prevQueue, song])
    }

    const removeFromQueue = (song) => {
        setQueue((prevQueue) => prevQueue.filter((songname) => songname !== song))
    }

    const add = (e) => {
        e.preventDefault();
        addToQueue(addName);
        setAddName('')
    }

    const remove = (e) => {
        e.preventDefault();
        removeFromQueue(removeName);
        setRemoveName('')
    }

    return (
        <>
            <div style={{padding: "10px"}}>
                <h2>Add to queue</h2>
                <form onSubmit={add}>
                    <input type="text" 
                    placeholder="Enter song name" 
                    value={addName} 
                    onChange={(e) => setAddName(e.target.value)}
                    />
                    <br />
                    <button type="submit">Add song to Queue</button>
                </form>
            </div>
            <div style={{padding: "10px"}}>
                <h2>Remove from queue</h2>
                <form onSubmit={remove}>
                    <input type="text"
                    placeholder="Enter song name"
                    value={removeName}
                    onChange={(e) => setRemoveName(e.target.value)}
                    />
                    <br />
                    <button type="submit">Remove song from Queue</button>
                </form>
            </div>
            <br />
            <div style={{padding: "10px"}}>
                <h2>Queue</h2>
                {queue.map(song => (
                    <ul>
                    <li id={song.id}>
                        <span>{song}</span>
                    </li>
                    </ul>
                ))}
            </div>
        </>
    )
}

export default Queue