import { Link } from "react-router-dom";

export default function NavigationBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/userList">User List</Link>
                </li>
                <li>
                    <Link to="/addUser">Add User</Link>
                </li>
            </ul>
        </nav>
    )
}