import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavigationBar() {

    let navigate = useNavigate(); 
    const logout = (dataU:any) =>{ 
        localStorage.removeItem("auth");
        navigate('/login');
    }

    return (
        <nav>
            <ul className="navbar">
                <li className="navbar-li">
                    <Link to="/home">Home</Link>
                </li>
                <li className="navbar-li">
                    <Link to="/userList">User List</Link>
                </li>
                <li className="navbar-li">
                    <Link to="/addUser">Add User</Link>
                </li>
                <li className="navbar-li">
                    <Link to="/login" onClick={logout}>Logout</Link>
                </li>              
            </ul>
        </nav>
    )
}