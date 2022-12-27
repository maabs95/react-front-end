import './App.css';
import { FC } from "react";
import Get from './components/api/getApi';
import Register from './components/api/registerUser';
import EditUser from './components/api/editUser';
import NavigationBar from './components/NavigationBar';
import Homepage from './components/Home';
import Login from './components/api/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CheckAuth } from './components/CheckAuth';
import PrivateRoute,{ProtectedRouteProps} from './components/PrivateRoute';

const App: FC = () => {

  // const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'elem'> = {
  //   loginPage: '/login',
  // };

  return (
    <BrowserRouter>
      <NavigationBar />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<Homepage />}/>
          <Route index element={<Login />} />
          <Route path="userList" element={<Get />} />
          <Route path="addUser" element={<Register />} />
          <Route path="editUser" element={<EditUser />} />
          <Route path="*" element={<Homepage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
 
  
}

export default App;
