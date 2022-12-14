import React, { useState } from "react";
import {useLocation} from 'react-router-dom';

function EditUser(){
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [message, setMessage] = useState('');

    const location = useLocation();
    console.log(location.state.username);

    const getJson = async (event:any) => {
        event.preventDefault()
        await fetch ('http://localhost:8080/v1/editUser',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "passowrd": "123",
                "firstName": firstName,
                "lastName": lastName,
                "role": "admin"

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

    return (
        <div className="editUser" id="editUser">
            <h1>Edit User</h1>
        </div>
    )
}

export default EditUser;