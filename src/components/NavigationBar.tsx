import { Link } from "react-router-dom";

export default function NavigationBar() {
    return (
        <nav>
            <ul className="navbar">
                <li className="navbar-li">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar-li">
                    <Link to="/userList">User List</Link>
                </li>
                <li className="navbar-li">
                    <Link to="/addUser">Add User</Link>
                </li>
                <li className="navbar-li">
                    <Link to="/logout">Logout</Link>
                </li>
                <li className="navbar-li">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}