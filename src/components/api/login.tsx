import { useEffect, useState } from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
    let navigate = useNavigate(); 
    
    useEffect(() => {
        if ("auth" in localStorage) {
            let path = '/'; 
            navigate(path);
        }
      }, []);

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');

    
    const auth = async (e:any) => {
        e.preventDefault();
        fetch("http://localhost:8080/v1/login",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(response => {
            if(response.ok){
                return response.json();                
            } else if(response.status === 401){
                setMessage("Invalid username or password");
            } else {
                setMessage("Error");
            }
        }).then(data => {
            localStorage.setItem("auth",data.Authorization);
            localStorage.setItem("role",data.role)
;            // console.log("localStorage >> " + localStorage.getItem("auth"));
            // localStorage.removeItem("auth");

            let path = '/home'; 
            navigate(path);
        });
    }

    return(
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={auth}>
                <input id="username" placeholder="Username" type="text" onChange={(event) => setUsername(event.target.value)}/><br />
                <input id="password" placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)}/><br />
                <button type="submit">Login</button>
            </form>
            <div className="error-message">{message}</div>
        </div>
    )
}

export default Login;