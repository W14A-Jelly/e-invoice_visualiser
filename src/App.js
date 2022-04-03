import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login2 from './Login'
import Register2 from './Register';
import Main from './Main'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login2/>} />
          <Route path = "/register" element = {<Register2/>} />
          <Route path = "/file" element = {<Main/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
