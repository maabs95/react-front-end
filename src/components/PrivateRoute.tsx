import { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { validation } from "./api/auth";

export type ProtectedRouteProps = {
    loginPage: string;
    elem: JSX.Element;
  };

export default function PrivateRoute ({loginPage, elem}: ProtectedRouteProps) {

    let status;
    const [statusVal, setStatusVal] = useState(Number);
    // const validate = async () => {
    //     // e.preventDefault();
    //     const getRes = await fetch("http://localhost:8080/v1/loggedInUser",{
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("auth")
    //         }
    //     });

    //     setStatusVal(getRes.status);
    //     console.log(getRes.status);

    //     return getRes.status;
    
    // }

    // console.log(v);

    useEffect(()=>{
        validation();
    },[])

    // console.log(status);
    // v.then(function(result) {
    //     status = result;
    //     console.log(status);
    // });

    // console.log(statusVal);
    if(status === 200){
        console.log("authenticate");
        return elem;
    }else {
        console.log("NOT authenticate")
        return <Navigate to={{ pathname: loginPage }} />
    }
  }