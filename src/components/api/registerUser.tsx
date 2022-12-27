import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){

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
        // console.log(response.json);
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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password,setPassword] = useState('');

    const [message, setMessage] = useState('');

    const getJson = async (event:any) => {
        // console.log("ROLE >> " + role.length);
        // if(role === '' || role == undefined || role.length == 0){
        //     setRole('ROLE_USER');
        // }
        // console.log("ROLE >> " + role);
        event.preventDefault()
        await fetch ('http://localhost:8080/v1/addUser',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("auth")
            },
            body: JSON.stringify({
                "username": username,
                "firstname": firstName,
                "lastname": lastName,
                "password": password,
                "email":email,
                "role":role.length == 0? "ROLE_USER": role
            })
        }).then((response) => {
            if(!response.ok){
                setMessage('Error ' + response.status);
            } else {
                setMessage('Success');
                setUsername('');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
            }
        }).catch((error) => {
            console.log(error);
        });        
    }

    return(
        <div className="registerUser" id="registerUser">
            <h1> Add User</h1>
            <form onSubmit={getJson}>
                <input id="username" placeholder="Username" type="text" value={username} onChange={(event) => setUsername(event.target.value)}/><br />
                <input id="firstname" placeholder="First Name" type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)}/><br />
                <input id="lastname" placeholder="Last Name" type="text" value={lastName} onChange={(event) => setLastName(event.target.value)}/><br />
                <input id="password" placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/><br />
                <input id="email" placeholder="Email" type="text" value={email} onChange={(event) => setEmail(event.target.value)}/><br />
                <select name="role" id="role" onChange={(event) => setRole(event.target.value)}>
                    <option value="ROLE_USER">ROLE_USER</option>
                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                </select><br/>
                <button type="submit">Add User</button>
                <h1>{message}</h1>
            </form>
        </div>
        
    )
}

export default Register