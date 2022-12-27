import React, { useState, useEffect } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import User from '../../data/userData';

function EditUser(){

    let navigate = useNavigate(); 
    const validation = async () => {
        const response = await fetch("http://localhost:8080/v1/loggedInUser",{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("auth")
            }
        });
        if(response.status !== 200){
            let path = '/login'; 
            // alert("Unauthorized");
            navigate(path);
        } else {
            const jsonResponse = await response.json();
            if(jsonResponse.role != "ROLE_ADMIN"){
                let path = '/home'; 
                navigate(path);
            }
        }
    }
    useEffect(()=>{
        validation()
    },[])


    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    // const [password,setPassword] = useState('');

    const [message, setMessage] = useState('');

    const location = useLocation();
    const [posts,setPosts] = useState<User>();
    const getJson = async () => {
        const getRes = await fetch ('http://localhost:8080/v1/getUserByUsername?username=' + location.state.username ,{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("auth")
            }
        });

        const jsonResponse = await getRes.json();
        console.log(jsonResponse);
        setPosts(jsonResponse);
        setFirstName(jsonResponse.username);
        setLastName(jsonResponse.lastname);
        setEmail(jsonResponse.email);
        setRole(jsonResponse.role);
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
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("auth")
            },
            body: JSON.stringify({
                "username": posts?.username,
                // "password": password,
                "firstname": firstname,
                "lastname": lastname,
                "email":email,
                "role":role
            })
        }).then((response) => {
            if(!response.ok){
                setMessage('Error ' + response.status);
            } else {
                setMessage('Updated');
                setUsername('');
                setFirstName('');
                setLastName('');
                if(role == localStorage.getItem("role")){
                    localStorage.setItem("role",role)
                }
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
                First Name: <input id="firstname" type="text" placeholder={posts?.firstname} onChange={(event) => setFirstName(event.target.value)}/><br />
                Last Name: <input id="lastname" type="text" placeholder={posts?.firstname} onChange={(event) => setLastName(event.target.value)}/><br />
                Email: <input id="email" placeholder={posts?.email} type="text" onChange={(event) => setEmail(event.target.value)}/><br />
                Role: <select name="role" id="role" value={posts?.role} onChange={(event) => setRole(event.target.value)}>
                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                    <option value="ROLE_USER">ROLE_USER</option>
                </select><br/>
                {/* Password: <input id="password" type="password" onChange={(event) => setPassword(event.target.value)}/><br /> */}
                <button type="submit">Save</button>
            </form>
            <h2>{message}</h2>
        </div>
    )
}

export default EditUser;