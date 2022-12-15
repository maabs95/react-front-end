import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import User from '../../data/userData';

function EditUser(){
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [message, setMessage] = useState('');

    const location = useLocation();
    const [posts,setPosts] = useState<User>();
    const getJson = async () => {
        const getRes = await fetch ('http://localhost:8080/v1/getUserByUsername?username=' + location.state.username ,{
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }
        });

        const jsonResponse = await getRes.json();
        let jsonvalue = jsonResponse[0];
        setPosts(jsonvalue);
    }

    useEffect(()=>{
        getJson();
    },[])

    // getJson();
    
    const postJson = async (event:any) => {
        event.preventDefault()
        await fetch ('http://localhost:8080/v1/editUser',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": posts?.username,
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
            <form onSubmit={postJson}>
                Username: <input id="username" type="text" placeholder={posts?.username} disabled={true} /><br />
                First Name: <input id="firstname" type="text" placeholder={posts?.firstName} onChange={(event) => setFirstName(event.target.value)}/><br />
                Last Name: <input id="lastname" type="text" placeholder={posts?.lastName} onChange={(event) => setLastName(event.target.value)}/><br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditUser;