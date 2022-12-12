import React from 'react';
import './App.css';
import HelloWorld from './components/HelloWord';
import List from './components/List';
import { FC } from "react";
import Get from './components/api/getApi';
import Register from './components/api/registerUser';

let avengers = [
  { name: 'Captain America' },
  { name: 'Iron Man' },
  { name: 'Black Widow' },
  { name: 'Thor' },
  { name: 'Hawkeye' },
  { name: 'Vision' },
  { name: 'Hulk' },
]

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
