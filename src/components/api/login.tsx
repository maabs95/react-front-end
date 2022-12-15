import { useState } from "react";
import User from '../../data/userData';
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const [message,setMessage] = useState('');

    let navigate = useNavigate(); 
    const auth = async (e:any) => {
        e.preventDefault();
        const getRes = await fetch("http://localhost:8080/v1/login",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });

        const response = getRes;
        if(response.ok){
            localStorage.setItem("auth","");
            let path = '/'; 
            navigate(path);
        } else {

        }
        
    }

    return(
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={auth}>
                <input id="username" placeholder="Username" type="text" onChange={(event) => setUsername(event.target.value)}/><br />
                <input id="password" placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)}/><br />
                <button type="submit">Login</button>
            </form>
            {message}
        </div>
    )
}

export default Login;