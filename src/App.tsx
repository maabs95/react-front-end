import './App.css';
import { FC } from "react";
import Get from './components/api/getApi';
import Register from './components/api/registerUser';
import EditUser from './components/api/editUser';
import NavigationBar from './components/NavigationBar';
import Homepage from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route index element={<Homepage />} />
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
