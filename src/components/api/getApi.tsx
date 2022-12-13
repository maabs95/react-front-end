import React, { useState } from "react";
import User from '../../data/userData';


function Get(){
    const [posts,setPosts] = useState<User[]>([]);
    const getJson = async () => {
        const getRes = await fetch ('http://localhost:8080/v1/user',{
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }
        });

        const jsonResponse = await getRes.json();
        console.log("jsonResponse => " , jsonResponse);
        setPosts(jsonResponse)
    }

    return(
        <div className="row">
            User List
            <br/>
            <button onClick={getJson} className="btn btn-primary">User</button>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((userValue,key) => {
                        return(
                            <tr key={key} >
                                <td>{userValue.username}</td>
                                <td>{userValue.firstName}</td>
                                <td>{userValue.lastName}</td>
                                <td><button>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Get