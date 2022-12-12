import React, { useState } from "react";
import User from '../../data/userData';

const us = {
    username:"",
    password: "",
    firstName: "",
    lastName: "",
    role: ""
}

function Register(){
    const [formData, setFormData] = useState(us);
    const { username, password, firstName, lastName,role } = formData;

    const onChange = (e: any) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: "teseeesssst"
        }));
    }; 

    const getJson = async () => {
        const getRes = await fetch ('http://localhost:8080/v1/addUser',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                formData
            })
        });
        const jsonResponse = await getRes.json();
        console.log("jsonResponse => " , jsonResponse);
        // setPosts(jsonResponse)
    }

    return(
        <div className="row">
            <form onSubmit={getJson}>
                <input id="firstname" placeholder="First Name" type="text" value={firstName} onChange={onChange}/><br />
                <input id="lastname" placeholder="Last Name" type="text" value={lastName} onChange={onChange}/><br />
                <button type="submit">Add User</button>
            </form>
        </div>
        
    )
}

export default Register