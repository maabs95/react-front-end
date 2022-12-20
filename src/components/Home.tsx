import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {

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
        }
    }
    useEffect(()=>{
        validation()
    },[])

    return (
        <h1>Welcome to Home page</h1>
    )
}