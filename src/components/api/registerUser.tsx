import React, { useState } from "react";

function Register(){
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [message, setMessage] = useState('');

    const getJson = async (event:any) => {
        event.preventDefault()
        await fetch ('http://localhost:8080/v1/addUser',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "firstName": firstName,
                "lastName": lastName
            })
        }).then((response) => {
            if(!response.ok){
                setMessage('Error ' + response.status);
            } else {
                setMessage('Success');
                setUsername('');
                setFirstName('');
                setLastName('');
            }
        }).catch((error) => {
            console.log(error);
        });        
    }

    return(
        <div className="registerUser" id="registerUser">
            <form onSubmit={getJson}>
                <input id="username" placeholder="Username" type="text" value={username} onChange={(event) => setUsername(event.target.value)}/><br />
                <input id="firstname" placeholder="First Name" type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)}/><br />
                <input id="lastname" placeholder="Last Name" type="text" value={lastName} onChange={(event) => setLastName(event.target.value)}/><br />
                <button type="submit">Add User</button>
                <h1>{message}</h1>
            </form>
        </div>
        
    )
}

export default Register