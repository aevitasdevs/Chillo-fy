import React from "react"

function UserNotFound({onsubmit}) {
    return (
        <>
            <h1>Invalid Credentials</h1>
            <button onClick={onsubmit}>Try again!</button>
        </>
    )
}

export default UserNotFound