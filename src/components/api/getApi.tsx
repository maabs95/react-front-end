import { useState } from "react";
import User from '../../data/userData';
import { FC } from "react";

const Get: FC = () => {
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

    const [message, setMessage] = useState('');
    const deleteUser = async (dataU:any) => {
        const username = Object.keys(dataU).map(key=> dataU[key].username);
        let stringusername = username[0];
        await fetch ('http://localhost:8080/v1/deleteUser',{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": stringusername
            })
        }).then((response) => {
            if(!response.ok){
                setMessage('Error');
            } else {
                setMessage(stringusername + " deleted");
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    return(
        <div className="userRegister">
            <h1>User List</h1>
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
                                <td>
                                    <button onClick={() => deleteUser({userValue})}>Edit</button>
                                    <button onClick={() => deleteUser({userValue})}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {message}
        </div>
    )
}

export default Get;