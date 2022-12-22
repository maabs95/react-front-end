import { useEffect, useState } from "react";
import User from '../../data/userData';
import { FC } from "react";
import { useNavigate } from "react-router-dom";
// import { validation } from "./auth";

const Get: FC = () => {
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
    }sad

    useEffect(()=>{
        validation()
    },[])

    const [posts,setPosts] = useState<User[]>([]);
    const getJson = async () => {
        const getRes = await fetch ('http://localhost:8080/v1/user',{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("auth")
            }
        });

        const jsonResponse = await getRes.json();
        setPosts(jsonResponse)
    }

    const [message, setMessage] = useState('');
    const deleteUser = async (dataU:any) => {
        const username = Object.keys(dataU).map(key=> dataU[key].username);
        let stringusername = username[0];
        await fetch ('http://localhost:8080/v1/deleteUser?username=' + stringusername,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("auth")                
            }
        }).then((response) => {
            if(!response.ok){
                setMessage('Error');
            } else {
                setMessage(stringusername + " deleted");
                window.location.reload();
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    
    const routeChange = (dataU:any) =>{ 
        const un = Object.keys(dataU).map(key=> dataU[key].username);
        let path = '/editUser'; 
        navigate(path,{state:{username:un[0]}});
    }

    // BULK DELETE
    const[bulkDelete, setBulkDelete] = useState<string[]>([]);
    let tobedeleted="";
    const checkedDelete = (e:string, checked:boolean) => {
        if(checked){
            setBulkDelete(oldArray => [...oldArray,e])
        } else {
            setBulkDelete(bulkDelete.filter(item=> item != e));
        }
        bulkDelete.forEach((element) =>{
            // console.log(element);
            tobedeleted = tobedeleted + element + ",";
            console.log(tobedeleted);
            
        })
    }

    const deleteChosen = async () => {
        // bulkDelete.forEach((element) =>{
        //     tobedeleted = tobedeleted + element + ",";
        // })
        console.log(tobedeleted);
        await fetch ('http://localhost:8080/v1/deleteBulk?username=' + tobedeleted, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("auth")               
            }, body: JSON.stringify({
            })
        }).then((response) => {
            if(!response.ok){
                setMessage('Error');
            } else {
                setMessage(bulkDelete.toString + " deleted");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <div className="userRegister">
            <h1>User List</h1>
            <button id="getUsers" onClick={getJson} className="btn btn-primary">User</button>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th><button onClick={deleteChosen}>Delete Chosen</button></th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((userValue,key) => {
                        return(
                            <tr key={key} >
                                <td><input type="checkbox" name="delete" value={userValue.username} onChange={(event) => checkedDelete(event.target.value, event.target.checked)} /></td>
                                <td>{userValue.username}</td>
                                <td>{userValue.firstname}</td>
                                <td>{userValue.lastname}</td>
                                <td>{userValue.email}</td>
                                <td>{userValue.role}</td>
                                <td>
                                    <button onClick={() => routeChange({userValue})}>Edit</button>
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