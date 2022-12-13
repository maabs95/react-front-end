import React from 'react';
import './App.css';
import { FC } from "react";
import Get from './components/api/getApi';
import Register from './components/api/registerUser';

const App: FC = () => {
  return (
    <div className="App">
      <Get />
      <br />
      <Register />
    </div>
  );
}

export default App;
